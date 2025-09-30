import type { Component } from "solid-js";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "~/components/ui/number-field";

export type NumberInputProps = {
  readonly label: string;
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly formatter: Intl.NumberFormatOptions;
  readonly onChange: (value: number) => void;
};

export const NumberInput: Component<NumberInputProps> = (props) => {
  const handleChange = (value: number | number[]): void => {
    const newValue = Array.isArray(value) ? value[0] : value;
    const safeValue =
      newValue !== undefined && !Number.isNaN(newValue)
        ? newValue
        : (props.min ?? 0);
    props.onChange(safeValue);
  };

  return (
    <div class="flex items-center">
      <div class="w-32">{props.label}</div>
      <NumberField
        class="w-40"
        value={props.value}
        onRawValueChange={handleChange}
        minValue={props.min}
        maxValue={props.max}
        step={props.step}
        formatOptions={props.formatter}>
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldIncrementTrigger />
          <NumberFieldDecrementTrigger />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
};
