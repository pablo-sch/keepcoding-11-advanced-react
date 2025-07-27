import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AdvertItem from "./advert-item";
import Button from "../../components/ui/button";
import Page from "../../components/layout/page";

import { advertsLoaded, tagsLoaded } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store";

// ................................................
const EmptyList = () => (
  <div className="adverts-page-empty">
    <p>Be the first to publish!</p>
    <Link to="/adverts/new">
      <Button>Create Advert</Button>
    </Link>
  </div>
);

// =======================================================================================================================================================
export default function AdvertsPage() {
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
      <div className="adverts-page mt-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <input type="text" placeholder="Name" className="border rounded px-2 py-1" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} />

          <input type="number" placeholder="Max price" className="border rounded px-2 py-1" value={filters.price} onChange={(e) => setFilters({ ...filters, price: e.target.value })} />

          <select className="border rounded px-2 py-1" value={filters.tag} onChange={(e) => setFilters({ ...filters, tag: e.target.value })}>
            <option value="all">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {filteredAdverts.length ? (
          <ul className="space-y-4">
            {filteredAdverts.map((ad) => (
              <li key={ad.id}>
                <Link to={`/adverts/${ad.id}`} className="block hover:no-underline">
                  <AdvertItem advert={ad} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
}
