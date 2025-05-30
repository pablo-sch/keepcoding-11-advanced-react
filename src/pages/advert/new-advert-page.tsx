// NewAdvertPage.tsx
import { useState, useRef, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { createAdvert } from "./service"; // ya no importas getTags aquí

import Button from "../../components/ui/button";
import Page from "../../components/layout/page";
import TagsDropdown from "../../components/ui/tags-dropdown";

import "./new-advert-page.css";

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

  // Estado para la vista previa de la imagen
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  // Limpiar URL de preview si cambia o al desmontar
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
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" name="name" maxLength={120} ref={nameRef} onInput={validateForm} />

      <label htmlFor="price">Price:</label>
      <input id="price" type="number" name="price" ref={priceRef} onInput={validateForm} />

      <label htmlFor="sale">Type:</label>
      <select id="sale" name="sale" ref={saleRef} onChange={validateForm} defaultValue="true">
        <option value="true">Sale</option>
        <option value="false">Purchase</option>
      </select>

      <label>Tags:</label>
      <TagsDropdown
        selectedTags={selectedTags}
        onChange={(updated) => {
          setSelectedTags(updated);
          selectedTagsRef.current = updated;
          validateForm();
        }}
      />

      <label htmlFor="photo">Photo:</label>
      <input id="photo" type="file" name="photo" accept="image/*" ref={photoRef} onChange={handlePhotoChange} />

      {photoPreview && (
        <div className="photo-preview-wrapper">
          <img src={photoPreview} alt="Preview" className="photo-preview" />
        </div>
      )}

      <Button type="submit" disabled={!canSubmit || isSubmitting}>
        Create advert
      </Button>

      {priceTooHigh && <div style={{ color: "red", marginTop: "1rem" }}>Price cannot exceed {PRICE_MAX}.</div>}

      {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
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
