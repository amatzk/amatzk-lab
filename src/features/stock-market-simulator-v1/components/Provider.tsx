import { type Component, createContext, type JSX, useContext } from "solid-js";
import { createSimulatorStore, type SimulatorStore } from "../lib/store";

const SimulatorContext = createContext<SimulatorStore>();

export const Provider: Component<{ children: JSX.Element }> = (props) => {
  const model = createSimulatorStore();
  return (
    <SimulatorContext.Provider value={model}>{props.children}</SimulatorContext.Provider>
  );
};

export const useModel = () => {
  const ctx = useContext(SimulatorContext);
  if (!ctx) throw new Error("useModel must be used within Provider");
  return ctx;
}
