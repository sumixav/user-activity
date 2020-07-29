import { createContext } from "react";

const ModalContext = createContext();
export const ModalProvider = ModalContext.Provider;
export const ModalConsumer = ModalContext.Consumer;

export default ModalContext;
