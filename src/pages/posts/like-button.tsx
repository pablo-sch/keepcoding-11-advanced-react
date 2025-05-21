import "./like-button.css";
import clsx from "clsx";
import LikedIcon from "../../components/icons/like-icon";
import DislikeIcon from "../../components/icons/dislike-icon";

interface LikeButtonProps {
  likes: number;
  isLiked?: boolean;
  onLike: () => void;
}

const LikeButton = ({ likes, isLiked, onLike }: LikeButtonProps) => {
  const Icon = isLiked ? LikedIcon : DislikeIcon;

  return (
    <div
      role="button"
      className={clsx("like-button", {
        "like-button--active": isLiked,
      })}
      onClick={onLike}
    >
      <span className="like-button-icon">
        <Icon width="20" height="20" />
      </span>
      <span className="like-button-label">{likes}</span>
    </div>
  );
};

export default LikeButton;