import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import { getAdvert, deleteAdvert } from "./service";
import type { Advert } from "./types";

import defaultImage from "../../../public/image-placeholder.jpg";

function AdvertPage() {
  const { advertId } = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      alert("Error al eliminar el anuncio.");
    }
  };

  if (!advert) return <p>Loading ad...</p>;

  return (
    <article className="advert-item">
      <div className="advert-item-photo-container">
        <div className="advert-item-photo-wrapper">{advert.photo ? <img src={advert.photo} alt={advert.name} className="advert-item-photo" style={{ width: "300px" }} /> : <img src={defaultImage} alt={advert.name} className="advert-item-photo" style={{ width: "300px" }} />}</div>
      </div>
      <div className="advert-item-content">
        <div className="advert-item-header">
          <div>
            <strong>{advert.name}</strong> — {advert.price}€
          </div>
        </div>
        <div className="advert-item-details">
          <div>
            {advert.sale ? "Sale" : "Purchase"} — Tags: {advert.tags.join(", ")}
          </div>
          <div>{advert.createdAt}</div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {!confirmDelete ? (
            <button onClick={() => setConfirmDelete(true)}>Delete Advert</button>
          ) : (
            <div>
              <p>Are you sure you want to delete the Advert?</p>
              <button onClick={handleDelete}>Yes, delete</button>
              <button onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default AdvertPage;
