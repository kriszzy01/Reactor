import { ReactionProvider } from "./providers";

import Nav from "./components/Nav/Nav";
import Reactions from "./components/Reactions/Reactions";
import AddReaction from "./components/Cursor/Cursor";

const Reactor = () => {
  return (
    <ReactionProvider>
      <Nav />
      <AddReaction />
      <Reactions />
    </ReactionProvider>
  );
};

export default Reactor;
