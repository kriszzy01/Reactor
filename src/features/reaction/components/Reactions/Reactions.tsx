import style from "./style.module.scss";

import { useReactionContext } from "../../providers";
import Reaction from "../Reaction/Reaction";

const Reactions = () => {
  const { reactions, ids, status, handleUpdateReaction, handleStatus } =
    useReactionContext();

  return (
    <div>
      {ids.map((id) => {
        const reaction = reactions[id];

        return (
          <div
            key={id}
            style={{
              left: `${reaction.position.left}px`,
              top: `${reaction.position.top}px`,
            }}
            className={style["reactions"]}
          >
            <div className={style["reactions__reaction"]} data-status={status}>
              {reaction.description?.comment && (
                <p>{reaction.description.comment}</p>
              )}
              {reaction.description?.emoji && (
                <p>{reaction.description.emoji}</p>
              )}
            </div>

            {status === "reacting" && !reaction.description && (
              <Reaction
                onReact={(payload) => {
                  handleUpdateReaction(id, payload);
                  handleStatus("completed");
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Reactions;
