import { useState, useRef, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { createAdvert, getTags } from "./service";

import Button from "../../components/ui/button";
import Page from "../../components/layout/page";
import TagsDropdown from "../../components/ui/tags-dropdown";

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
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    const loadTags = async () => {
      const data = await getTags();
      setTags(data);
    };
    loadTags();
  }, []);

  const validateForm = () => {
    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) ?? 0;
    const tags = selectedTagsRef.current;
    setCanSubmit(name !== "" && price > 0 && tags.length > 0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) ?? 0;
    const sale = saleRef.current?.value === "true";
    const tags = selectedTagsRef.current;
    const photoFile = photoRef.current?.files?.[0];

    if (!name || price <= 0 || tags.length === 0) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("sale", sale.toString());
    formData.append("tags", tags.join(","));

    if (photoFile) formData.append("photo", photoFile);

    setIsSubmitting(true);
    setError(null);

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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" maxLength={120} ref={nameRef} onInput={validateForm} />
      </label>
      <br />

      <label>
        Type:
        <select name="sale" ref={saleRef} onChange={validateForm}>
          <option value="true">Sale</option>
          <option value="false">Purchase</option>
        </select>
      </label>
      <br />

      <label>
        Price:
        <input type="number" name="price" ref={priceRef} onInput={validateForm} />
      </label>
      <br />

      <label>Tags: {selectedTags.length > 0 ? selectedTags.join(", ") : "none"}</label>
      <TagsDropdown
        selectedTags={selectedTags}
        onChange={(updated) => {
          setSelectedTags(updated);
          selectedTagsRef.current = updated;
          validateForm();
        }}
      />
      <br />

      <label>
        Photo:
        <input type="file" name="photo" ref={photoRef} />
      </label>
      <br />

      <Button type="submit" disabled={!canSubmit || isSubmitting}>
        Create advert
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

function NewAdvertPage() {
  return (
    <Page title="Create new advert">
      <NewAdvertPageForm />
    </Page>
  );
}

export default NewAdvertPage;
