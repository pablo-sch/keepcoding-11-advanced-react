//REACT
import type { Advert } from "./types";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, price, sale, tags, photo } = advert;
  const defaultImage = "/image-placeholder.jpg";

  return (
    <article className="tweet-item">
      <div className="flex gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white items-center">
        <img src={photo || defaultImage} alt={`Advert: ${name}`} className="w-70 h-70 object-cover rounded-md border" />
        <div className="flex flex-col justify-between text-gray-800 text-sm space-y-1">
          <h3 className="text-base font-semibold">{name}</h3>
          <p>
            <span className="font-medium">{sale ? "Sale" : "Purchase"}</span>
            <span> — Tags: {tags.join(", ")}</span>
          </p>
          <p className="text-base font-semibold text-green-600">€{price}</p>
        </div>
      </div>
    </article>
  );
};

export default AdvertItem;
