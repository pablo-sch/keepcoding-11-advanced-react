import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getAdvert } from "./service";
import type { Advert } from "./types";

import { AxiosError } from "axios";

function AdvertPage() {
  const { advertId } = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);

  useEffect(() => {
    if (!advertId) return;

    getAdvert(advertId)
      .then(setAdvert)
      .catch((error) => {
        if (error instanceof AxiosError && error.response?.status === 404) {
          navigate("/not-found", { replace: true });
        }
      });
  }, [advertId, navigate]);

  if (!advert) return <p>Cargando anuncio...</p>;

  return (
    <div>
      <h1>{advert.name}</h1>
      <p><strong>Precio:</strong> {advert.price}€</p>
      <p><strong>Tipo:</strong> {advert.sale ? "Venta" : "Compra"}</p>
      <p><strong>Tags:</strong> {advert.tags.join(", ")}</p>
      {advert.photo && <img src={advert.photo} alt={advert.name} style={{ maxWidth: "300px" }} />}
    </div>
  );
}

export default AdvertPage;
