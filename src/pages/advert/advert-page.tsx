import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import Page from "../../components/layout/page";
import { getAdvert, deleteAdvert } from "./service";
import type { Advert } from "./types";

import "./advert-page.css";
import { formatDate } from "../../utils/format-date";
import Button from "../../components/ui/button";

function AdvertPage() {
  const { advertId } = useParams();
  const navigate = useNavigate();

  const [advert, setAdvert] = useState<Advert | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const defaultImage = "/image-placeholder.jpg";

  useEffect(() => {
    if (!advertId) return;

    getAdvert(advertId)
      .then(setAdvert)
      .catch((error) => {
        if (error instanceof AxiosError && error.response?.status === 404) {
          navigate("/not-found", { replace: true });
        }
      });
  }, [advertId, navigate]);

  const handleDelete = async () => {
    if (!advertId) return;

    try {
      await deleteAdvert(advertId);
      navigate("/adverts");
    } catch (error) {
      alert("Error deleting the advert.");
      console.log(error);
    }
  };

  if (!advert) return <p>Loading ad...</p>;

  return (
    <Page title="Advert Detail">
      <article className="advert-page">
        <div className="advert-page-photo-container">
          <div className="advert-page-photo-wrapper">{advert.photo ? <img src={advert.photo} alt={advert.name} className="advert-page-photo" /> : <img src={defaultImage} alt={advert.name} className="advert-page-photo" />}</div>
        </div>
        <div className="advert-page-data">
          <p>
            <strong>{advert.name}</strong> - €{advert.price}
          </p>
          <p>
            <strong>{advert.sale ? "Sale" : "Purchase"}</strong> - <strong>Tags: </strong>
            {advert.tags.join(", ")}
          </p>
          <p>
            <strong>Created at: </strong>
            {formatDate(advert.createdAt)}
          </p>
        </div>
        {
          <div className="advert-page-handle-delete">
            {!confirmDelete ? (
              <div>
                <Button className="advert-delete-submit" onClick={() => setConfirmDelete(true)}>
                  Delete Advert
                </Button>
              </div>
            ) : (
              <div>
                <div>
                  <p>Are you sure you want to delete the advert?</p>
                </div>
                <div>
                  <Button className="advert-confirm-delete-submit" onClick={handleDelete}>
                    Yes, delete
                  </Button>
                  <Button className="advert-cancel-delete-submit" onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        }
      </article>
    </Page>
  );
}

export default AdvertPage;
