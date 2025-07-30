//DEPENDENCIES
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";

//REACT
import Page from "../../components/layout/page";
import { formatDate } from "../../utils/format-date";
import Button from "../../components/ui/button";

//REDUX
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdvert } from "../../store/selectors";
import { advertsDelete, advertDetail } from "../../store/actions";

function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const advert = useAppSelector(getAdvert(params.advertId));
  const dispatch = useAppDispatch();

  const defaultImage = "/image-placeholder.jpg";

  const [confirmDelete, setConfirmDelete] = useState(false);

  // ................................................
  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    dispatch(advertDetail(params.advertId)).catch((error) => {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          navigate("/not-found", { replace: true });
        }
      }
    });
  }, [params.advertId, navigate, dispatch]);

  // ................................................
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

  return (
    <Page title="Advert Detail">
      <div className="advert-detail">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 ">
          <div className="flex flex-col lg:flex-row-reverse gap-10">
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{advert?.name}</h1>
              <p className="text-2xl text-indigo-600 font-semibold">€{advert?.price}</p>
              <p className="text-lg text-gray-700">
                Tags: <span className="italic">{advert?.tags.join(", ")}</span>
              </p>

              <div className="pt-4 border-t border-gray-200">
                {!confirmDelete ? (
                  <Button $variant="danger" className="mt-2 bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 shadow-md" onClick={() => setConfirmDelete(true)}>
                    Delete Advert
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-red-700 font-semibold">Are you sure you want to delete this advert?</p>
                    <div className="flex gap-4">
                      <Button $variant="danger" className="bg-red-600 hover:bg-red-700 transition-colors duration-200" onClick={handleDelete}>
                        Yes, delete
                      </Button>
                      <Button $variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-700" onClick={() => setConfirmDelete(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="relative w-full lg:w-[50%] bg-gray-100 p-4 rounded-md">
              <img src={advert?.photo || defaultImage} alt={advert?.name} className="w-full max-h-[700px] object-cover rounded-md border border-gray-300 shadow-sm" />
              <span className={`absolute top-6 right-6 px-5 py-2 text-lg uppercase font-bold rounded-full shadow-md ${advert?.sale ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{advert?.sale ? "Sale" : "Purchase"}</span> <p className="text-sm text-gray-500 text-center mt-4">Created at: {formatDate(advert?.createdAt || "")}</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default AdvertPage;
