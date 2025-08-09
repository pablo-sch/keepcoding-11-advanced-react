//DEPENDENCIES
import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";

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
import { getTags, getUi } from "../../store/selectors";
import { useUiResetError } from "../../store/hooks";

//=======================================================================================================
function NewAdvertPage() {
  const dispatch = useAppDispatch();
  const { error, pending: isFetching } = useAppSelector(getUi);
  const tags = useAppSelector(getTags);
  const uiResetErrorAction = useUiResetError();

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    selectedTags: [] as string[],
    sale: "true",
    photoPreview: null as string | null,
  });

  const [errors, setErrors] = useState({ name: "", price: "", tags: "" });
  const [touched, setTouched] = useState({ name: false, price: false, tags: false });

  const PRICE_MAX = 25000;
  const tagOptions = [{ value: "", label: "Select a tag" }, ...tags.map((tag: string) => ({ value: tag, label: tag }))];

  //-------------------------------------------------------------------------
  useEffect(() => {
    nameRef.current?.focus();
    if (tags.length === 0) dispatch(tagsLoaded());
  }, [tags, dispatch]);

  //-------------------------------------------------------------------------
  useEffect(
    () => () => {
      if (formData.photoPreview) URL.revokeObjectURL(formData.photoPreview);
    },
    [formData.photoPreview]
  );

  //-------------------------------------------------------------------------
  const validateForm = useCallback(() => {
    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) || 0;
    const { selectedTags } = formData;

    const newErrors = {
      name: !name ? "Name is required" : "",
      price: price <= 0 ? "Price must be greater than 0" : price > PRICE_MAX ? `Price cannot exceed €${PRICE_MAX}` : "",
      tags: selectedTags.length === 0 ? "Please select at least one tag" : "",
    };

    setErrors(newErrors);
  }, [formData, PRICE_MAX]);

  //-------------------------------------------------------------------------
  const canSubmit = (() => {
    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) || 0;
    const hasNoErrors = !Object.values(errors).some((error) => error);
    const hasValidData = name && price > 0 && price <= PRICE_MAX && formData.selectedTags.length > 0;

    return hasNoErrors && hasValidData && !isFetching;
  })();

  //-------------------------------------------------------------------------
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  //-------------------------------------------------------------------------
  const touchField = useCallback((field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  //-------------------------------------------------------------------------
  const handlePhotoChange = useCallback(() => {
    const file = photoRef.current?.files?.[0];
    if (formData.photoPreview) URL.revokeObjectURL(formData.photoPreview);
    setFormData((prev) => ({ ...prev, photoPreview: file ? URL.createObjectURL(file) : null }));
  }, [formData.photoPreview]);

  //-------------------------------------------------------------------------
  const handleTagChange = useCallback(
    (value: string) => {
      touchField("tags");
      setFormData((prev) => ({ ...prev, selectedTags: value ? [value] : [] }));
    },
    [touchField]
  );

  //-------------------------------------------------------------------------
  const resetForm = useCallback(() => {
    [nameRef, priceRef, photoRef].forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });

    if (formData.photoPreview) URL.revokeObjectURL(formData.photoPreview);
    setFormData({ selectedTags: [], sale: "true", photoPreview: null });
    setErrors({ name: "", price: "", tags: "" });
    setTouched({ name: false, price: false, tags: false });
  }, [formData.photoPreview]);

  //-------------------------------------------------------------------------
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({ name: true, price: true, tags: true });

    validateForm();

    if (!canSubmit || isFetching) return;

    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) || 0;
    const { selectedTags, sale } = formData;
    const photoFile = photoRef.current?.files?.[0];

    const submitData = new FormData();
    submitData.append("name", name);
    submitData.append("price", price.toString());
    submitData.append("sale", sale);
    submitData.append("tags", selectedTags.join(","));
    if (photoFile) submitData.append("photo", photoFile);

    try {
      await dispatch(advertsCreate(submitData));
      resetForm();
    } catch (err) {
      console.error("Error creating advert:", err);
    }
  };

  return (
    <Page title="Create new advert">
      <div className="new-advert">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <Form onSubmit={handleSubmit} layout="withPreview" previewSrc={formData.photoPreview}>
            <FormField
              id="name"
              name="name"
              label="Name"
              placeholder="Enter product name"
              type="text"
              maxLength={120}
              ref={nameRef}
              onInput={validateForm}
              onBlur={() => touchField("name")}
              error={errors.name}
              touched={touched.name}
              required
            />

            <FormField
              id="price"
              name="price"
              label="Price (€)"
              placeholder="Enter price"
              type="number"
              maxValue={PRICE_MAX}
              ref={priceRef}
              onInput={validateForm}
              onBlur={() => touchField("price")}
              error={errors.price}
              touched={touched.price}
              required
            />

            <Dropdown
              name="sale"
              label="Type"
              value={formData.sale}
              onChange={(val: string) => setFormData((prev) => ({ ...prev, sale: val }))}
              options={[
                { value: "true", label: "Sale" },
                { value: "false", label: "Purchase" },
              ]}
            />

            <div>
              <Dropdown
                name="tags"
                label="Tags"
                value={formData.selectedTags[0] || ""}
                options={tagOptions}
                onChange={handleTagChange}
              />
              {touched.tags && errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
            </div>

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

            {error && <ErrorMessage message={error.message} onClick={uiResetErrorAction} />}

            <div className="pt-4">
              <Button className="w-full" type="submit" disabled={!canSubmit}>
                {isFetching ? "Creating Advert..." : "Create Advert"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Page>
  );
}

export default NewAdvertPage;
