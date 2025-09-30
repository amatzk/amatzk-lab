import { currencyFormatOptions, quantityCommaFormatOptions } from "./formatters";
import type { NumberInputConfiguration, Settings } from "./type";

export const DEFAULT_SETTINGS: Settings = {
    numOfParticipants: 100,
    initialCapital: 1000,
    initialHoldings: 10,
    initialStockPrice: 100,
}

export const SETTING_CONFIG: ReadonlyArray<NumberInputConfiguration> = [
  {
    id: "numOfParticipants",
    label: "参加人数",
    settingKey: "numOfParticipants",
    formatter: quantityCommaFormatOptions,
    min: 1,
    step: 1,
    max: 100,
  },
  {
    id: "initialCapital",
    label: "初期資金",
    settingKey: "initialCapital",
    formatter: currencyFormatOptions,
    min: 1,
    step: 1,
    max: 1000000,
  },
  {
    id: "initialHoldings",
    label: "初期保有株数",
    settingKey: "initialHoldings",
    formatter: quantityCommaFormatOptions,
    min: 1,
    step: 1,
    max: 1000,
  },
  {
    id: "initialStockPrice",
    label: "初期株価",
    settingKey: "initialStockPrice",
    formatter: currencyFormatOptions,
    min: 1,
    step: 1,
    max: 10000,
  },
];
