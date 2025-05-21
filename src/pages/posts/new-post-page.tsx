import "./new-tweet-page.css";
import Layout from "../../components/layout/layout";
import Button from "../../components/ui/button";
import Photo from "../../components/ui/photo";
import Textarea from "../../components/ui/text-area";

const MAX_CHARACTERS = 140;

function NewTweetPage() {
  return (
    <Layout title="What are you thinking?">
      <div className="new-tweet-page">
        <div>
          <Photo />
        </div>
        <form className="new-tweet-page-form">
          <Textarea
            className="new-tweet-page-textarea"
            placeholder="Hey! What's up!"
            maxLength={MAX_CHARACTERS}
          />
          <div className="new-tweet-page-footer">
            <span className="new-tweet-page-characters"></span>
            <Button
              type="submit"
              className="new-tweet-page-submit"
              $variant="primary"
            >
              Let's go!
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default NewTweetPage;