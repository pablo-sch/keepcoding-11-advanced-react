import { format } from "date-fns";
import type { Post } from "./types";
import "./post-item.css";
import LikeButton from "./like-button";
import Photo from "../../components/ui/photo";

interface PostItemProps {
  post: Post;
}

const TweetItem = ({ post }: PostItemProps) => {
  const { user, updatedAt, content, likes } = post;
  return (
    <article className="tweet-item">
      <div>
        <Photo className="tweet-item-photo" />
      </div>
      <div className="right">
        <div className="tweet-item-header">
          <span className="tweet-item-name">{user.name}</span>
          <span className="tweet-item-username">{user.username}</span>
          <span className="tweet-item-separator">·</span>
          <time dateTime={updatedAt}>
            {format(new Date(updatedAt))}
          </time>
        </div>
        <div>
          {content}
          <div className="tweet-item-actions">
            <LikeButton
              onLike={() => console.log("Click on like")}
              likes={likes.length}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TweetItem;