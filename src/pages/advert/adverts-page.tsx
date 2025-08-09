//DEPENDENCIES
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//REACT
import AdvertItem from "./advert-item";
import Form from "../../components/ui/form";
import Dropdown from "../../components/ui/drop-down";
import FormField from "../../components/ui/form-field";
import Button from "../../components/ui/button";
import Page from "../../components/layout/page";

//REDUX
import { advertsLoaded, tagsLoaded } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store";
import { getTags } from "../../store/selectors";

// ................................................
const EmptyList = () => (
  <div className="flex flex-col items-center justify-center text-center bg-gray-100 rounded-lg p-8 mt-8 shadow-md">
    <img src="/empty-box.webp" alt="No adverts" className="w-24 h-24 mb-4 opacity-70" />
    <h2 className="text-xl font-semibold text-gray-700 mb-2">No adverts found</h2>
    <p className="text-gray-500 mb-6">It looks like there are no adverts matching your filters. Be the first to create one!</p>
    <Link to="/adverts/new">
      <Button $variant="secondary">Create New Advert</Button>
    </Link>
  </div>
);

// =======================================================================================================================================================
function AdvertsPage() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(getTags);
  const adverts = useAppSelector((state) => state.adverts.data || []);

  const [filters, setFilters] = useState({
    name: "",
    price: "",
    sale: "all",
    tag: "all",
  });

  const tagOptions = [{ value: "all", label: "All Tags" }, ...tags.map((tag) => ({ value: tag, label: tag }))];

  const saleOptions = [
    { value: "all", label: "All" },
    { value: "true", label: "Sale" },
    { value: "false", label: "Purchase" },
  ];
  //-------------------------------------------------------------------------
  useEffect(() => {
    dispatch(advertsLoaded());
    if (tags.length === 0) dispatch(tagsLoaded());
  }, [dispatch, tags]);

  //-------------------------------------------------------------------------
  const filteredAdverts = adverts.filter((ad) => {
    const { name, price, sale, tag } = filters;

    return (
      ad.name.toLowerCase().includes(name.toLowerCase()) &&
      (price === "" || ad.price <= Number(price)) &&
      (sale === "all" || ad.sale === (sale === "true")) &&
      (tag === "all" || ad.tags.includes(tag))
    );
  });

  //-------------------------------------------------------------------------
  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Page title="Available Adverts">
      <div className="adverts-page">
        <div className="max-w-screen-xl mx-auto space-y-8">
          <Form variant="search">
            <div className="flex flex-wrap gap-4">
              <FormField
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={filters.name}
                onChange={(e) => updateFilter("name", e.target.value)}
              />

              <FormField
                id="price"
                name="price"
                type="number"
                placeholder="Max price"
                value={filters.price}
                onChange={(e) => updateFilter("price", e.target.value)}
              />

              <Dropdown
                name="sale"
                value={filters.sale}
                onChange={(value) => updateFilter("sale", value)}
                options={saleOptions}
                className="flex-1"
              />

              <Dropdown name="tag" value={filters.tag} onChange={(value) => updateFilter("tag", value)} options={tagOptions} />
            </div>
          </Form>

          {filteredAdverts.length ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdverts.map((ad) => (
                <li key={ad.id}>
                  <Link to={`/adverts/${ad.id}`}>
                    <AdvertItem advert={ad} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyList />
          )}
        </div>
      </div>
    </Page>
  );
}

export default AdvertsPage;
