import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AxiosError } from "axios";

import { getAdvert } from "./service";
import type { Advert } from "./types";

import defaultImage from "../../../public/image-placeholder.jpg";

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
    <article className="advert-item">
      <div className="advert-item-photo-container">
        <div className="advert-item-photo-wrapper">{advert.photo ? <img src={advert.photo} alt={advert.name} className="advert-item-photo" style={{ width: "300px" }} /> : <img src={defaultImage} alt={advert.name} className="advert-item-photo" style={{ width: "300px" }} />}</div>
      </div>
      <div className="advert-item-content">
        <div className="advert-item-header">
          <div>
            <strong>{advert.name}</strong> — {advert.price}€
          </div>
          <div>{/*<strong>Posted by:</strong> {advert.user.name} ({advert.user.username})*/}</div>
        </div>
        <div className="advert-item-details">
          <div>
            {advert.sale ? "Sale" : "Purchase"} — Tags: {advert.tags.join(", ")}
          </div>
          <div>{advert.createdAt}</div>
        </div>
      </div>
    </article>
  );
}

export default AdvertPage;
