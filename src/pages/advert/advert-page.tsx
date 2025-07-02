import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import Page from "../../components/layout/page";
import { getAdvert, deleteAdvert } from "./service";
import type { Advert } from "./types";

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
      <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Image */}
        <div className="w-full flex justify-center">
          <img src={advert.photo || defaultImage} alt={advert.name} className="w-full max-w-md rounded-md object-cover border" />
        </div>

        {/* Data */}
        <div className="text-gray-800 text-sm space-y-2">
          <p className="text-lg font-semibold">
            {advert.name} - €{advert.price}
          </p>
          <p>
            <span className="font-medium">{advert.sale ? "Sale" : "Purchase"}</span> — Tags: {advert.tags.join(", ")}
          </p>
          <p>
            <span className="font-medium">Created at:</span> {formatDate(advert.createdAt)}
          </p>
        </div>

        {/* Delete Section */}
        <div className="pt-4 border-t mt-4">
          {!confirmDelete ? (
            <div>
              <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => setConfirmDelete(true)}>
                Delete Advert
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-red-600 font-medium">Are you sure you want to delete this advert?</p>
              <div className="flex gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
                  Yes, delete
                </Button>
                <Button className="bg-gray-300 hover:bg-gray-400" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </article>
    </Page>
  );
}

export default AdvertPage;
