import { nanoid } from "nanoid";
import React from "react";

export interface Position {
  left: number;
  top: number;
}

interface ReactionInfo {
  comment: string;
  emoji: string;
}

interface Reaction {
  position: Position;
  description?: ReactionInfo;
}

type Status = "init" | "reacting" | "completed";

interface Context {
  status: Status;
  ids: string[];
  reactions: Record<string, Reaction>;
  handleStatus: (status: Status) => void;
  handleCreateReaction: (payload: Reaction) => void;
  handleUpdateReaction: (id: string, payload: ReactionInfo) => void;
}

interface Props {
  children: React.ReactNode;
}

export const ReactionContext = React.createContext<Context>({
  status: "completed",
  ids: [],
  reactions: {} as Context["reactions"],
  handleCreateReaction: () => null,
  handleUpdateReaction: () => null,
  handleStatus: () => null,
});

export const ReactionProvider = ({ children }: Props) => {
  const [status, setStatus] = React.useState<Status>("completed");
  const [ids, setIds] = React.useState<Context["ids"]>([]);
  const [reactions, setReactions] = React.useState<Context["reactions"]>({});

  const handleCreateReaction = (payload: Reaction) => {
    const id = nanoid();
    setIds((prevIds) => [...prevIds, id]);
    setReactions((reactions) => ({ ...reactions, [id]: payload }));
    setStatus("reacting");
  };

  const handleUpdateReaction = (id: string, payload: ReactionInfo) => {
    setReactions((reactions) => ({
      ...reactions,
      [id]: { ...reactions[id], description: payload },
    }));
  };

  const handleStatus = (status: Status) => setStatus(status);

  return (
    <ReactionContext.Provider
      value={{
        status,
        ids,
        reactions,
        handleCreateReaction,
        handleUpdateReaction,
        handleStatus,
      }}
    >
      {children}
    </ReactionContext.Provider>
  );
};

export const useReactionContext = (): Context => {
  const context = React.useContext(ReactionContext);

  if (!context) {
    throw new Error(
      "Ensure that you wrap any components in the OnboardingProvider component"
    );
  }

  return context;
};
