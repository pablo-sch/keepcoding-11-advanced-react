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
    sale: "", // Sin selección inicial
    photoPreview: null as string | null,
  });

  const [errors, setErrors] = useState({ name: "", price: "", tags: "" });
  const [touched, setTouched] = useState({ name: false, price: false, tags: false });

  const PRICE_MAX = 25000;

  // Ya no necesitas incluir "Select a tag" porque el dropdown lo maneja internamente
  const tagOptions = tags.map((tag: string) => ({ value: tag, label: tag }));

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
    const price = priceRef.current?.value ?? "";
    const { selectedTags } = formData;

    const newErrors: typeof errors = { name: "", price: "", tags: "" };

    if (!name && !nameRef.current?.dataset.optional) {
      newErrors.name = "Name is required";
    }

    if (!price && !priceRef.current?.dataset.optional) {
      newErrors.price = "Price is required";
    }

    if (selectedTags.length === 0) {
      newErrors.tags = "Please select at least one tag";
    }

    setErrors(newErrors);
  }, [formData]);

  //-------------------------------------------------------------------------
  const canSubmit = (() => {
    const name = nameRef.current?.value.trim() ?? "";
    const price = Number(priceRef.current?.value) || 0;
    const { sale, selectedTags } = formData;
    const hasNoErrors = !Object.values(errors).some((error) => error);
    const hasValidData = name && price > 0 && price <= PRICE_MAX && selectedTags.length > 0 && sale;

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
    (values: string[]) => {
      touchField("tags");
      setFormData((prev) => ({ ...prev, selectedTags: values }));
    },
    [touchField]
  );

  //-------------------------------------------------------------------------
  const resetForm = useCallback(() => {
    [nameRef, priceRef, photoRef].forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });

    if (formData.photoPreview) URL.revokeObjectURL(formData.photoPreview);
    setFormData({ selectedTags: [], sale: "", photoPreview: null });
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
            />

            <Dropdown
              name="sale"
              label="Type"
              value={formData.sale}
              options={[
                { value: "true", label: "Sale" },
                { value: "false", label: "Purchase" },
              ]}
              placeholder="Select type"
              onChange={(val) => setFormData((prev) => ({ ...prev, sale: val as string }))}
            />

            <Dropdown
              name="tags"
              label="Tags"
              value={formData.selectedTags}
              options={tagOptions}
              onChange={handleTagChange}
              multiple
              placeholder="Select tags"
              error={errors.tags}
              touched={touched.tags}
            />

            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                Photo <span className="text-gray-400 text-sm">(optional)</span>
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
