import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AdvertItem from "./advert-item";
import Button from "../../components/ui/button";
import Page from "../../components/layout/page";

import { advertsLoaded, tagsLoaded } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store";

import Form from "../../components/ui/form";
import Dropdown from "../../components/ui/drop-down";
import FormField from "../../components/ui/form-field";

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
  const tags = useAppSelector((state) => state.tags);

  useEffect(() => {
    dispatch(advertsLoaded());
  }, [dispatch]);

  useEffect(() => {
    dispatch(tagsLoaded());
  }, [dispatch]);

  const [filters, setFilters] = useState({
    name: "",
    price: "",
    sale: "all",
    tag: "all",
  });

  const adverts = useAppSelector((state) => state.adverts || []);

  const filteredAdverts = adverts.filter((ad) => {
    const matchesName = ad.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesPrice = filters.price === "" || ad.price <= Number(filters.price);
    const matchesSale = filters.sale === "all" || ad.sale === (filters.sale === "true");
    const matchesTag = filters.tag === "all" || ad.tags.includes(filters.tag);

    return matchesName && matchesPrice && matchesSale && matchesTag;
  });

  return (
    <Page title="Available Adverts">
      <div className="adverts-page">
        <div className="max-w-screen-xl mx-auto space-y-8">
          <Form variant="search">
            <div className="flex flex-wrap gap-4">
              <FormField id="name" name="name" type="text" placeholder="Name" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} />

              <FormField id="price" name="price" type="number" placeholder="Max price" value={filters.price} onChange={(e) => setFilters({ ...filters, price: e.target.value })} />

              <Dropdown
                name="sale"
                value={filters.sale}
                onChange={(value) => setFilters({ ...filters, sale: value })}
                options={[
                  { value: "all", label: "All" },
                  { value: "true", label: "Sale" },
                  { value: "false", label: "Purchase" },
                ]}
                className="flex-1"
              />

              <Dropdown name="tag" value={filters.tag} onChange={(value) => setFilters({ ...filters, tag: value })} options={[{ value: "all", label: "All Tags" }, ...tags.map((tag) => ({ value: tag, label: tag }))]} />
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
