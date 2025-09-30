import type { Component } from "solid-js";
import { Button } from "~/components/ui/button";
import { SETTING_CONFIG } from "../lib/consts";
import { NumberInputSection } from "./NumberInputSection";
import { useModel } from "./Provider";

type GenerateButtonProps = {
  count?: number;
};

const GenerateButton: Component<GenerateButtonProps> = (props) => {
  const model = useModel();
  const { addTransactions } = model;

  const handleGenerate = () => {
    addTransactions(props.count ?? 100);
  };

  return (
    <Button
      class=""
      onClick={handleGenerate}>
      {props.count ?? 100}回
    </Button>
  );
};

const ResetButton: Component = () => {
  const model = useModel();
  const { resetStore } = model;

  return (
    <Button
      variant="destructive"
      class=""
      onClick={resetStore}>
      リセット
    </Button>
  );
};

export const ControlPanel: Component = () => {
  return (
    <div class="max-w-[85rem] my-8 p-4 mx-auto flex flex-col gap-6">
      <NumberInputSection
        title="設定値"
        configs={SETTING_CONFIG}
      />
      <div class="flex flex-wrap gap-3">
        <GenerateButton count={1} />
        <GenerateButton count={10} />
        <GenerateButton count={100} />
        <GenerateButton count={1000} />
        <ResetButton />
      </div>
    </div>
  );
};
