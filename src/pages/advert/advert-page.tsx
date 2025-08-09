//DEPENDENCIES
import { useParams } from "react-router";
import { useState, useEffect, useCallback } from "react";

//REACT
import Page from "../../components/layout/page";
import { formatDate } from "../../utils/format-date";
import Button from "../../components/ui/button";
import ErrorMessage from "../../components/ui/error-message-props";

//REDUX
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdvert } from "../../store/selectors";
import { advertsDelete, advertDetail } from "../../store/actions";
import { getUi } from "../../store/selectors";
import { useUiResetError } from "../../store/hooks";

//-------------------------------------------------------------------------
interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  advertName?: string;
  isLoading?: boolean;
}

//-------------------------------------------------------------------------
const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel, advertName, isLoading }: ConfirmDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center space-x-2">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800">Delete Confirmation</h3>
      </div>

      <p className="text-red-700">
        Are you sure you want to delete <strong>&quot;{advertName}&quot;</strong>? This action cannot be undone.
      </p>

      <div className="flex gap-3 pt-2">
        <Button $variant="danger" onClick={onConfirm} disabled={isLoading} className="min-w-[100px]">
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </Button>
        <Button $variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

//=======================================================================================================
function AdvertPage() {
  const { error } = useAppSelector(getUi);
  const uiResetErrorAction = useUiResetError();

  const params = useParams();
  const advert = useAppSelector(getAdvert(params.advertId));
  const dispatch = useAppDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultImage = "/image-placeholder.jpg";

  //-------------------------------------------------------------------------
  useEffect(() => {
    if (!params.advertId) {
      return;
    }

    dispatch(advertDetail(params.advertId));
  }, [params.advertId, dispatch]);

  //-------------------------------------------------------------------------
  const handleDeleteConfirm = useCallback(async () => {
    if (!advert?.id) return;

    setIsDeleting(true);

    try {
      await dispatch(advertsDelete(advert.id));
    } catch (err) {
      console.error("Error deleting advert:", err);
      setIsDeleting(false);
    }
  }, [advert, dispatch]);

  const handleDeleteCancel = useCallback(() => {
    setConfirmDelete(false);
  }, []);

  //-------------------------------------------------------------------------
  if (!advert && !error) {
    return (
      <Page title="Loading...">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading advert details...</span>
        </div>
      </Page>
    );
  }

  return (
    <Page title={advert?.name || "Advert Detail"}>
      <div className="advert-detail">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <div className="flex flex-col lg:flex-row-reverse gap-10">
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{advert?.name}</h1>
                <p className="text-3xl text-indigo-600 font-semibold">€{advert?.price?.toLocaleString()}</p>
              </div>

              {advert?.tags && advert.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {advert.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-200">
                {error && <ErrorMessage message={error.message} onClick={() => uiResetErrorAction()} />}

                <ConfirmDeleteModal
                  isOpen={confirmDelete}
                  onConfirm={handleDeleteConfirm}
                  onCancel={handleDeleteCancel}
                  advertName={advert?.name}
                  isLoading={isDeleting}
                />

                {!confirmDelete && (
                  <Button $variant="danger" onClick={() => setConfirmDelete(true)} disabled={isDeleting}>
                    Delete Advert
                  </Button>
                )}
              </div>
            </div>

            <div className="relative w-full lg:w-[50%] bg-gray-100 p-4 rounded-md">
              <div className="relative">
                <img
                  src={advert?.photo || defaultImage}
                  alt={advert?.name || "Advert image"}
                  className="w-full max-h-[700px] object-cover rounded-md border border-gray-300 shadow-sm"
                />

                <span
                  className={`absolute top-4 right-4 px-4 py-2 text-sm font-bold uppercase rounded-full shadow-lg ${
                    advert?.sale ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {advert?.sale ? "Sale" : "Purchase"}
                </span>
              </div>

              {advert?.createdAt && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Created:</span> {formatDate(advert.createdAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default AdvertPage;
