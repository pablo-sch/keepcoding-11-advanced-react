import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "./service";
import type { Advert } from "./types";
import Button from "../../components/ui/button";
import Page from "../../components/layout/page";

function NewAdvertPageForm() {
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Omit<Advert, "id">>({
    name: "",
    price: 0,
    sale: true,
    tags: [],
    photo: "", // opcional
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDisabled =
    !formData.name || formData.price <= 0 || formData.tags.length === 0 || isSubmitting;

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      const selected = Array.from(
        (e.target as HTMLSelectElement).selectedOptions
      ).map((opt) => opt.value);
      setFormData((prev) => ({ ...prev, tags: selected }));
    } else if (name === "sale") {
      setFormData((prev) => ({ ...prev, sale: value === "true" }));
    } else if (name === "price") {
      setFormData((prev) => ({ ...prev, price: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const advert = await createAdvert(formData);
      navigate(`/adverts/${advert.id}`);
    } catch (err) {
      setError("No se pudo crear el anuncio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="new-advert-page-form" onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          ref={nameInputRef}
        />
      </label>

      <label>
        Tipo:
        <select
          name="sale"
          value={String(formData.sale)}
          onChange={handleChange}
        >
          <option value="true">Venta</option>
          <option value="false">Compra</option>
        </select>
      </label>

      <label>
        Precio:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>

      <label>
        Tags:
        <select
          name="tags"
          multiple
          value={formData.tags}
          onChange={handleChange}
        >
          <option value="motor">Motor</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="mobile">Mobile</option>
          <option value="work">Work</option>
        </select>
      </label>

      <Button type="submit" disabled={isDisabled}>
        Crear anuncio
      </Button>

      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

function NewAdvertPage() {
  return (
    <Page title="Crear nuevo anuncio">
      <div className="new-advert-page">
        <NewAdvertPageForm />
      </div>
    </Page>
  );
}

export default NewAdvertPage;
