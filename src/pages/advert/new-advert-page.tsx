import { useState, useRef, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "./service";
import Button from "../../components/ui/button";
import Page from "../../components/layout/page";

const tagOptions = ["motor", "lifestyle", "mobile", "work"];

function TagsDropdown({ selectedTags, onChange }: { selectedTags: string[]; onChange: (selected: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (tag: string) => {
    const updated = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
    onChange(updated);
  };

  return (
    <div>
      <button type="button" onClick={toggleDropdown}>
        Select tags
      </button>

      {isOpen && (
        <ul>
          {tagOptions.map((tag) => (
            <li key={tag}>
              <input type="checkbox" id={`tag-${tag}`} onChange={() => handleCheckboxChange(tag)} checked={selectedTags.includes(tag)} />
              <label htmlFor={`tag-${tag}`}>{tag}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NewAdvertPageForm() {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const saleRef = useRef<HTMLSelectElement>(null);
  const selectedTagsRef = useRef<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    nameRef.current?.focus();
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

    if (!name || price <= 0 || tags.length === 0) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const advert = await createAdvert({
        name,
        price,
        sale,
        tags,
        photo: "",
      });

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
        <input type="text" name="name" ref={nameRef} onInput={validateForm} />
      </label>
      <br />

      <label>
        Type:
        <select name="sale" ref={saleRef}>
          <option value="true">Sale </option>
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

      <Button type="submit" disabled={!canSubmit || isSubmitting}>
        Create advert
      </Button>

      {error && <p>{error}</p>}
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
