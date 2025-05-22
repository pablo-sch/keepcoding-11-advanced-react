import { useEffect, useState } from "react";
import { getAdverts } from "./service";
import type { Advert } from "./types";
import { Link } from "react-router-dom";
import Button from "../../components/ui/button";
import AdvertItem from "./advert-item";
import Page from "../../components/layout/page";

const EmptyList = () => (
  <div className="adverts-page-empty">
    <p>¡Sé el primero en publicar!</p>
    <Link to="/adverts/new">
      <Button variant="primary">Crear anuncio</Button>
    </Link>
  </div>
);

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    async function fetchAdverts() {
      const data = await getAdverts();
      setAdverts(data);
    }
    fetchAdverts();
  }, []);

  return (
    <Page title="Anuncios disponibles">
      <div className="adverts-page">
        {adverts.length ? (
          <ul>
            {adverts.map((advert) => (
              <li key={advert.id}>
                <Link to={`/adverts/${advert.id}`}>
                  <AdvertItem advert={advert} />
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

export default AdvertsPage;
