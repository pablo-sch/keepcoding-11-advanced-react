//DEPENDENCIES
import { useState, useRef, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

//REACT
import Button from "../../components/ui/button";
import Page from "../../components/layout/page";
import FormField from "../../components/ui/form-field";
import TagsDropdown from "../../components/ui/tags-dropdown";

//REDUX
import { useAppDispatch } from "../../store";
import { advertsCreate } from "../../store/actions";

//=======================================================================================================
function NewAdvertPageForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const saleRef = useRef<HTMLSelectElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const selectedTagsRef = useRef<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  /* const [isSubmitting, setIsSubmitting] = useState(false); */
  const [error, setError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const PRICE_MAX = 25000;
  const [priceTooHigh, setPriceTooHigh] = useState(false);

  //-------------------------------------------------------------------------
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  //-------------------------------------------------------------------------
  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  //-------------------------------------------------------------------------
  const validateForm = () => {
    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) || 0;
    const tags = selectedTagsRef.current;

    setPriceTooHigh(price > PRICE_MAX);
    setCanSubmit(name !== "" && price > 0 && price <= PRICE_MAX && tags.length > 0);
  };

  //-------------------------------------------------------------------------
  const handlePhotoChange = () => {
    const file = photoRef.current?.files?.[0];
    if (file) {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
    validateForm();
  };

  //-------------------------------------------------------------------------
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) || 0;
    const tags = selectedTagsRef.current;

    if (!name || price <= 0 || price > PRICE_MAX || tags.length === 0) return;

    const sale = saleRef.current?.value === "true";
    const photoFile = photoRef.current?.files?.[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("sale", sale.toString());
    formData.append("tags", tags.join(","));
    if (photoFile) formData.append("photo", photoFile);

    try {
      setIsSubmitting(true);
      const createdAdvert = await dispatch(advertsCreate(formData));
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          navigate("/login", { replace: true });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-6" onSubmit={handleSubmit}>
      <FormField id="name" name="name" label="Name" type="text" maxLength={120} ref={nameRef} onInput={validateForm} required className="bg-gray-100" />

      <FormField id="price" name="price" label="Price" type="number" ref={priceRef} onInput={validateForm} required className="bg-gray-100" />

      <div>
        <label htmlFor="sale" className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select id="sale" name="sale" ref={saleRef} onChange={validateForm} defaultValue="true" className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100">
          <option value="true">Sale</option>
          <option value="false">Purchase</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <TagsDropdown
          selectedTags={selectedTags}
          onChange={(updated) => {
            setSelectedTags(updated);
            selectedTagsRef.current = updated;
            validateForm();
          }}
        />
      </div>

      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
          Photo
        </label>
        <input id="photo" type="file" name="photo" accept="image/*" ref={photoRef} onChange={handlePhotoChange} className="w-full text-sm text-gray-700 border rounded-md px-3 py-2 bg-gray-100" />
      </div>

      {photoPreview && (
        <div className="w-full flex justify-center mt-4">
          <img src={photoPreview} alt="Preview" className="max-w-xs max-h-64 rounded-md object-cover border" />
        </div>
      )}

      {priceTooHigh && <div className="text-red-600 text-sm">Price cannot exceed €{PRICE_MAX}.</div>}

      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

      <div className="pt-4">
        <Button className="w-full" type="submit" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Advert"}
        </Button>
      </div>
    </form>
  );
}

export default function NewAdvertPage() {
  return (
    <Page title="Create new advert">
      <NewAdvertPageForm />
    </Page>
  );
}
