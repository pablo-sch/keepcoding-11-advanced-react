//DEPENDENCIES
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

//REACT
import Page from "../../components/layout/page";
import { formatDate } from "../../utils/format-date";
import Button from "../../components/ui/button";

//REDUX
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdvert } from "../../store/selectors";
import { advertsDelete } from "../../store/actions";

function AdvertPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const advert = useAppSelector(getAdvert(params.advertId));
  const defaultImage = "/image-placeholder.jpg";
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!advert?.id) return;

    try {
      await dispatch(advertsDelete(advert.id));
      navigate("/adverts");
    } catch (error) {
      alert("Error deleting the advert.");
      console.log(error);
    }
  };

  /*  if (!advert) return <p>Loading ad...</p>; */

  return (
    <Page title="Advert Detail">
      <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="w-full flex justify-center">
          <img src={advert?.photo || defaultImage} alt={advert?.name} className="w-full max-w-md rounded-md object-cover border" />
        </div>

        <div className="text-gray-800 text-sm space-y-2">
          <p className="text-lg font-semibold">
            {advert?.name} - €{advert?.price}
          </p>
          <p>
            <span className="font-medium">{advert?.sale ? "Sale" : "Purchase"}</span> — Tags: {advert?.tags.join(", ")}
          </p>
          <p>
            <span className="font-medium">Created at:</span> {formatDate(advert?.createdAt || "")}
          </p>
        </div>

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
