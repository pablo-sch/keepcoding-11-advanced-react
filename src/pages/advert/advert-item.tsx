import type { Advert } from "./types";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, price, sale, tags, photo } = advert;

  return (
    <article className="advert-item">
      <div>
        {photo ? (
          <img src={photo} alt={name} className="advert-item-photo" />
        ) : (
          <div className="advert-item-photo-placeholder">📷</div>
        )}
      </div>
      <div className="advert-item-content">
        <div className="advert-item-header">
          <strong>{name}</strong> — {price}€
        </div>
        <div className="advert-item-details">
          {sale ? "En venta" : "Se busca"} — Tags: {tags.join(", ")}
        </div>
      </div>
    </article>
  );
};

export default AdvertItem;
