import defaultImage from "../../../public/image-placeholder.jpg";

import type { Advert } from "./types";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, price, sale, tags, photo } = advert;

  return (
    <article className="advert-item">
      <div className="advert-item-photo-container">
        <div className="advert-item-photo-wrapper">{photo ? <img src={photo} alt={name} className="advert-item-photo" style={{ width: "300px" }} /> : <img src={defaultImage} alt={name} className="advert-item-photo" style={{ width: "300px" }} />}</div>
      </div>
      <div className="advert-item-content">
        <div className="advert-item-header">
          <strong>{name}</strong> — {price}€
        </div>
        <div className="advert-item-details">
          {sale ? "Sale" : "Purchase"} — Tags: {tags.join(", ")}
        </div>
      </div>
    </article>
  );
};

export default AdvertItem;
