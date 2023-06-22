import style from "./style.module.scss";

import { useReactionContext } from "../../providers";

const Nav = () => {
  const { handleStatus } = useReactionContext();

  return (
    <button
      className={style.nav}
      type="button"
      onClick={() => handleStatus("init")}
    >
      Add Reaction
    </button>
  );
};

export default Nav;
