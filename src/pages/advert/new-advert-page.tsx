import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "./service";
import type { Advert } from "./types";
import Button from "../../components/ui/button";

function NewAdvertPageForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    sale: true,
    price: "",
    tags: [] as string[],
    photo: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDisabled =
    !formData.name || !formData.price || formData.tags.length === 0 || isSubmitting;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] ?? null;
      setFormData((prev) => ({ ...prev, photo: file }));
    } else if (name === "tags") {
      const selected = Array.from((e.target as HTMLSelectElement).selectedOptions).map(opt => opt.value);
      setFormData((prev) => ({ ...prev, tags: selected }));
    } else if (name === "sale") {
      setFormData((prev) => ({ ...prev, sale: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("sale", String(formData.sale));
      payload.append("price", formData.price);
      formData.tags.forEach((tag) => payload.append("tags", tag));
      if (formData.photo) {
        payload.append("photo", formData.photo);
      }

      const advert: Advert = await createAdvert(payload);
      navigate(`/adverts/${advert.id}`);
    } catch (err) {
      setError("No se pudo crear el anuncio");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="new-advert-page-form" onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>

      <label>
        Tipo:
        <select name="sale" value={String(formData.sale)} onChange={handleChange}>
          <option value="true">Venta</option>
          <option value="false">Compra</option>
        </select>
      </label>

      <label>
        Precio:
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </label>

      <label>
        Tags:
        <select name="tags" multiple value={formData.tags} onChange={handleChange}>
          <option value="motor">Motor</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="mobile">Mobile</option>
          <option value="work">Work</option>
        </select>
      </label>

      <label>
        Foto (opcional):
        <input type="file" name="photo" ref={fileInputRef} onChange={handleChange} />
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
    <div className="new-advert-page">
      <h1>Crear nuevo anuncio</h1>
      <NewAdvertPageForm />
    </div>
  );
}

export default NewAdvertPage;
