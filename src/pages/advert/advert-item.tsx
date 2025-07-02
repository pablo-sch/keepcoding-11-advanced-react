import type { Advert } from "./types";

//import Page from "../../components/layout/page";

import "./advert-item.css";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, price, sale, tags, photo } = advert;
  const defaultImage = "/image-placeholder.jpg";

  return (
    /*<Page title="">*/ <article className="advert-item">
      <div className="advert-item-photo-wrapper">{photo ? <img src={photo} alt={name} className="advert-item-photo" /> : <img src={defaultImage} alt={name} className="advert-item-photo" />}</div>
      <div className="advert-item-data">
        <p>
          <strong>{name}</strong> - €{price}
        </p>
        <p>
          <strong>{sale ? "Sale" : "Purchase"}</strong> - <strong>Tags: </strong>
          {tags.join(", ")}
        </p>
      </div>
    </article>
    /* </Page> */
  );
};

export default AdvertItem;
