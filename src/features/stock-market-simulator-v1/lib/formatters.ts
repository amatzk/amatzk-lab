// 金額
// 40000 → ¥40,000（桁区切り自動）
export const currencyFormatOptions: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "JPY",
  minimumFractionDigits: 0,
};

// カンマ区切り数値
// 1234567 → 1,234,567
export const quantityCommaFormatOptions: Intl.NumberFormatOptions = {
  style: "decimal",
  useGrouping: true,
};
