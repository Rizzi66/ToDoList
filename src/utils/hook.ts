import { Context, useContext } from "react";
import { ConfirmModalContext, FormModalContext, ModalContextType } from "./contextModal";
import { SortContext, SortContextType } from "./contextSort";
import { TaskContext, TaskContextType } from "./contextTask";

export const useModalContext = (type: "form" | "confirm"): ModalContextType => {
  const chooseContext = (contextType: Context<ModalContextType | null>) => {
    const context = useContext(contextType);
    if (!context) {
      throw new Error("useModalContext est null");
    }
    return context;
  };

  if (type === "form") {
    const context = chooseContext(FormModalContext);
    return context;
  } else if (type === "confirm") {
    const context = chooseContext(ConfirmModalContext);
    return context;
  }
  throw new Error(`Invalid modal type: ${type}`);
};

export const useSortContext = (): SortContextType => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortContext est null");
  }
  return context;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext est null");
  }
  return context;
};
