//DEPENDENCIES
import { useState, useRef, useEffect, type FormEvent, type SetStateAction } from "react";

//REACT
import Button from "../../components/ui/button";
import Page from "../../components/layout/page";

import FormField from "../../components/ui/form-field";
import Form from "../../components/ui/form";
import Dropdown from "../../components/ui/drop-down";
import ErrorMessage from "../../components/ui/error-message-props";

//REDUX
import { useAppDispatch, useAppSelector } from "../../store";
import { advertsCreate, tagsLoaded } from "../../store/actions";
import { getTags } from "../../store/selectors";
import { useUiResetError } from "../../store/hooks";
import { getUi } from "../../store/selectors";

//=======================================================================================================
function NewAdvertPage() {
  const dispatch = useAppDispatch();

  const { error } = useAppSelector(getUi);
  const uiResetErrorAction = useUiResetError();

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const selectedTagsRef = useRef<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState(Boolean);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const PRICE_MAX = 25000;
  const [priceTooHigh, setPriceTooHigh] = useState(false);

  const [sale, setSale] = useState("true");
  const tags = useAppSelector(getTags);
  const tagOptions = [{ value: "", label: "Select a tag" }, ...tags.map((tag: string) => ({ value: tag, label: tag }))];

  //-------------------------------------------------------------------------
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  //-------------------------------------------------------------------------
  useEffect(() => {
    if (tags.length === 0) {
      dispatch(tagsLoaded());
    }
  }, [tags, dispatch]);

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

    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) || 0;
    const tags = selectedTagsRef.current;
    const isSale = sale === "true";
    const photoFile = photoRef.current?.files?.[0];

    if (!name || price <= 0 || price > PRICE_MAX || tags.length === 0) {
      setCanSubmit(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("sale", isSale.toString());
    formData.append("tags", tags.join(","));
    if (photoFile) formData.append("photo", photoFile);

    try {
      await dispatch(advertsCreate(formData));

      if (nameRef.current) nameRef.current.value = "";
      if (priceRef.current) priceRef.current.value = "";
      if (photoRef.current) photoRef.current.value = "";

      setSelectedTags([]);
      selectedTagsRef.current = [];

      setSale("true");
      setPriceTooHigh(false);
      setPhotoPreview(null);
      setCanSubmit(false);
    } catch (err) {
      console.error("Error creating advert:", err);
    }
  };

  return (
    <Page title="Create new advert">
      <div className="new-advert">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <Form onSubmit={handleSubmit} layout="withPreview" previewSrc={photoPreview}>
            <FormField
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              maxLength={120}
              ref={nameRef}
              onInput={validateForm}
              required
            />

            <FormField id="price" name="price" placeholder="Price" type="number" ref={priceRef} onInput={validateForm} required />

            <Dropdown
              name="sale"
              label="Type"
              value={sale}
              onChange={(val: SetStateAction<string>) => {
                setSale(val);
                validateForm();
              }}
              options={[
                { value: "true", label: "Sale" },
                { value: "false", label: "Purchase" },
              ]}
            />

            <Dropdown
              name="tags"
              label="Tags"
              value={selectedTags[0] || ""}
              options={tagOptions}
              onChange={(value) => {
                if (value === "") {
                  setSelectedTags([]);
                  selectedTagsRef.current = [];
                } else {
                  setSelectedTags([value]);
                  selectedTagsRef.current = [value];
                }
                validateForm();
              }}
            />

            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                Photo
              </label>
              <input
                id="photo"
                type="file"
                name="photo"
                accept="image/*"
                ref={photoRef}
                onChange={handlePhotoChange}
                className="w-full px-3 py-2 rounded-md bg-gray-100 text-sm border border-gray-300 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               hover:cursor-pointer hover:border-gray-400 transition-colors"
              />
            </div>

            <ErrorMessage message={priceTooHigh ? `Price cannot exceed €${PRICE_MAX}.` : null} />
            {error && <ErrorMessage message={error.message} onClick={() => uiResetErrorAction()} />}

            <div className="pt-4">
              <Button className="w-full" type="submit" disabled={!canSubmit}>
                Create Advert
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Page>
  );
}
export default NewAdvertPage;
