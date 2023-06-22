import style from "./style.module.scss";

import React from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface Props {
  onReact: ({ emoji, comment }: { emoji: string; comment: string }) => void;
}

const Reaction = ({ onReact }: Props) => {
  const [comment, setComment] = React.useState<string>("");
  const [emoji, setEmoji] = React.useState<string>("");
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onReact({ emoji, comment });
  };

  const handleEmoji = ({ emoji }: EmojiClickData) => {
    setEmoji(emoji);
    setShowEmoji(false);
  };

  return (
    <form onSubmit={handleSubmit} className={style["reaction"]}>
      {showEmoji && (
        <div className={style["reaction__emoji"]}>
          <EmojiPicker
            searchDisabled
            skinTonesDisabled
            height={400}
            theme="dark"
            onEmojiClick={handleEmoji}
          />
        </div>
      )}

      <input
        type="text"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        className={style["reaction__field"]}
      />

      <div className={style["reaction__action"]}>
        <button
          type="button"
          className={style["reaction__button"]}
          onClick={() => setShowEmoji(true)}
        >
          {emoji || "Add Emoji"}
        </button>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Reaction;
