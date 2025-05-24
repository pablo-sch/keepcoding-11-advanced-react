import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  if (!advert) return <p>Loading ad...</p>;

  return (
    <div>
      <h1>Advert Detail</h1>
      <h2>{advert.name}</h2>

      <p>
        <span>
          <strong>pablo</strong>
        </span>
        <span>Abaroa</span>
      </p>

      <p>
        <strong>Price:</strong> {advert.price}€
      </p>

      <p>
        <strong>Type:</strong> {advert.sale ? "Sale" : "Purchase"}
      </p>

      <p>
        <strong>Tags:</strong> {advert.tags.join(", ")}
      </p>

      {advert.photo && <img src={advert.photo} alt={advert.name} style={{ maxWidth: "300px" }} />}
    </div>
  );
}

export default AdvertPage;
