// pages/advert/NewAdvertPage.tsx

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { createAdvert } from "./service";

import Button from "../../components/ui/button";
import Page from "../../components/layout/page";
import FormField from "../../components/ui/form-field";
import TagsDropdown from "../../components/ui/tags-dropdown";

/* import "./new-advert-page.css"; */
import "../../components/ui/form-field.css";

function NewAdvertPageForm() {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const saleRef = useRef<HTMLSelectElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const selectedTagsRef = useRef<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PRICE_MAX = 25000;
  const [priceTooHigh, setPriceTooHigh] = useState(false);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const validateForm = () => {
    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) || 0;
    const tags = selectedTagsRef.current;

    setPriceTooHigh(price > PRICE_MAX);
    setCanSubmit(name !== "" && price > 0 && price <= PRICE_MAX && tags.length > 0);
  };

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) || 0;
    const tags = selectedTagsRef.current;

    if (!name || price <= 0 || price > PRICE_MAX || tags.length === 0) {
      return;
    }

    const sale = saleRef.current?.value === "true";
    const photoFile = photoRef.current?.files?.[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("sale", sale.toString());
    formData.append("tags", tags.join(","));
    if (photoFile) formData.append("photo", photoFile);

    setIsSubmitting(true);
    try {
      const advert = await createAdvert(formData);
      navigate(`/adverts/${advert.id}`);
    } catch {
      setError("Failed to create advert.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <FormField id="name" name="name" label="Name" type="text" maxLength={120} ref={nameRef} onInput={validateForm} required />

      <FormField id="price" name="price" label="Price" type="number" ref={priceRef} onInput={validateForm} required />

      <label className="form-field">
        <label className="form-field-label">
          <span className="form-field-span">Type</span>
          <select id="sale" name="sale" ref={saleRef} onChange={validateForm} defaultValue="true" className="form-field-input">
            <option value="true">Sale</option>
            <option value="false">Purchase</option>
          </select>
        </label>
      </label>

      <label className="form-field">
        <label className="form-field-label">
          <span className="form-field-span">Tags</span>
          <TagsDropdown
            selectedTags={selectedTags}
            onChange={(updated) => {
              setSelectedTags(updated);
              selectedTagsRef.current = updated;
              validateForm();
            }}
          />
        </label>
      </label>

      <label className="form-field">
        <label className="form-field-label">
          {" "}
          <span className="form-field-span">Photo</span>
          <input id="photo" type="file" name="photo" accept="image/*" ref={photoRef} onChange={handlePhotoChange} className="form-field-input" />
        </label>
      </label>

      {photoPreview && (
        <div className="photo-preview-wrapper">
          <img src={photoPreview} alt="Preview" className="photo-preview" />
        </div>
      )}

      <Button className="new-advert-form-submit" type="submit" disabled={!canSubmit || isSubmitting}>
        Create advert
      </Button>

      {priceTooHigh && <div>Price cannot exceed {PRICE_MAX}.</div>}

      {error && <div>{error}</div>}
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
