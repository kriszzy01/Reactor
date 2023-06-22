import style from "./style.module.scss";

import useMousePosition from "../../../../hooks/useMousePosition";
import { useReactionContext } from "../../providers";

const Cursor = () => {
  const { status, handleCreateReaction } = useReactionContext();
  const { x, y } = useMousePosition();

  return (
    <>
      {status === "init" && (
        <div
          className={style["cursor"]}
          style={{ left: `${x}px`, top: `${y}px` }}
        >
          <button
            type="button"
            className={style["cursor__button"]}
            onClick={() =>
              handleCreateReaction({ position: { left: x, top: y } })
            }
          />
        </div>
      )}
    </>
  );
};

export default Cursor;
