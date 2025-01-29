import { useState, createContext, ReactNode } from "react";

export interface ModalContextType {
  isOpen: boolean;
  taskID: number | null;
  taskTitle?: string | null;
  open: (taskID: number | null, title?: string | null) => void;
  close: () => void;
  selectedValue?: string;
  selectValue?: (value: string) => void;
}

export const FormModalContext = createContext<ModalContextType | null>(null);

export const FormModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [taskID, setTaskID] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("A faire");

  const open = (taskID: number | null): void => {
    setTaskID(taskID);
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  const selectValue = (value: string): void => {
    switch (value) {
      case "All": {
        setSelectedValue("A faire");
        break;
      }
      case "En cours": {
        setSelectedValue("En cours");
        break;
      }
      case "A faire": {
        setSelectedValue("A faire");
        break;
      }
      case "Terminee": {
        setSelectedValue("Terminee");
      }
    }
  };

  return (
    <FormModalContext.Provider value={{ isOpen, taskID, open, close, selectValue, selectedValue }}>
      {children}
    </FormModalContext.Provider>
  );
};

export const ConfirmModalContext = createContext<ModalContextType | null>(null);

export const ConfirmModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [taskID, setTaskID] = useState<number | null>(null);
  const [taskTitle, setTaskTitle] = useState<string | null>(null);

  const open = (taskID: number | null, title?: string | null): void => {
    setTaskID(taskID);
    if (title) {
      setTaskTitle(title);
    }
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  return (
    <ConfirmModalContext.Provider value={{ isOpen, taskID, taskTitle, open, close }}>
      {children}
    </ConfirmModalContext.Provider>
  );
};
