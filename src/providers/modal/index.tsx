import React, { FC, ReactNode, useState } from "react";

type ModalContextProps = [boolean, ModalHandlers];

interface ModalHandlers {
  setChild: (child: React.ReactNode, show?: boolean) => void;
  toggleDisplay: () => void;
  setDisplay: (isVisible: boolean) => void;
}
const defaultHandlers: ModalHandlers = {
  setChild: () => {},
  toggleDisplay: () => {},
  setDisplay: () => {},
};

const ModalContext = React.createContext<ModalContextProps>([
  false,
  defaultHandlers,
]);

interface ModalProviderProps {
  children?: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalChild, setModalChild] = useState<React.ReactNode>(<></>);
  const handlers = React.useMemo<ModalHandlers>(() => {
    return {
      setChild: (child, show) => {
        setModalChild(child);
        setShowModal(!!show);
      },
      toggleDisplay: () => {
        setShowModal((prev) => !prev);
      },
      setDisplay: (isVisible) => setShowModal(isVisible),
    };
  }, []);

  const cancelPropagation = (ev: React.MouseEvent<HTMLDivElement>): void =>
    ev.stopPropagation();

  return (
    <>
      {showModal && (
        <div
          onClick={handlers.toggleDisplay}
          className="fixed h-screen w-screen top-0 left-0 z-50 bg-[#f8f7f7ec] dark:bg-[#161616ec] p-2 overflow-auto"
        >
          <div onClick={cancelPropagation}>{modalChild}</div>
        </div>
      )}
      <ModalContext.Provider value={[showModal, handlers]}>
        {children}
      </ModalContext.Provider>
    </>
  );
};

export const useModalContext: () => ModalContextProps = () =>
  React.useContext(ModalContext);
