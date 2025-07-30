//REACT
import type { Advert } from "./types";

interface AdvertItemProps {
  advert: Advert;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, price, sale, tags, photo, createdAt } = advert;
  const defaultImage = "/image-placeholder.jpg";

  return (
    <article className=" rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="flex flex-col items-center gap-4 bg-blue-100">
        <div className="relative w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
          <img src={photo || defaultImage} alt={`Advert: ${name}`} className="w-full h-auto max-h-[192px] object-contain" />
          <div className={`absolute top-3 right-3 px-3 py-1 text-sm uppercase font-bold rounded-full shadow-md text-white ${sale ? "bg-green-600" : "bg-red-600"}`}>{sale ? "SALE" : "PURCHASE"}</div>
        </div>

        <div className="w-full flex flex-col items-center text-center text-gray-900 space-y-2">
          <h3 className="text-lg font-bold leading-tight">{name}</h3>
          <p className="italic text-sm text-gray-600">Tags: {tags.join(", ")}</p>
          <p className="text-xl font-extrabold text-blue-700">€{price}</p>
        </div>

        {createdAt && (
          <div className="w-full bg-gray-800 text-gray-200 text-center text-sm rounded-b-xl py-2 mt-4">
            <span className="font-bold">Created at:</span> {formatDate(createdAt)}
          </div>
        )}
      </div>
    </article>
  );
};

export default AdvertItem;
