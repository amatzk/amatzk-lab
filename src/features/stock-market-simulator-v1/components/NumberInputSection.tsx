import { type Component, For } from "solid-js";
import type {
  NumberInputConfiguration,
  NumberInputSectionProps,
  SettingsKey,
} from "../lib/type";
import { NumberInput } from "./NumberInput";
import { useModel } from "./Provider";

export const NumberInputSection: Component<NumberInputSectionProps> = (
  props,
) => {
  const { updateSetting, getSettingValue, resetStore } = useModel();

  const handle = (k: SettingsKey, v: number) => {
    updateSetting(k, v);
    resetStore();
  };

  const createSettingPanelConfig = (config: NumberInputConfiguration) => ({
    label: config.label,
    value: getSettingValue(config.settingKey),
    formatter: config.formatter,
    min: config.min,
    max: config.max,
    step: config.step,
    onChange: (value: number) => handle(config.settingKey, value),
  });

  return (
    <div class="flex flex-wrap gap-4">
      <For each={props.configs}>
        {(config) => <NumberInput {...createSettingPanelConfig(config)} />}
      </For>
    </div>
  );
};
