interface NumberFormatter {
  (num: number, decimalPlaces?: number): string;
}
export const formatNumber: NumberFormatter = (num, decimalPlaces = 1) => {
  const roundedNum = num.toFixed(decimalPlaces);
  const numString = roundedNum.toString();
  const numArray = numString.split(".");
  const integerPart = numArray[0];
  const decimalPart = numArray[1] ? `.${numArray[1]}` : "";
  let formattedNum = "";
  for (let i = integerPart.length - 1; i >= 0; i--) {
    const digit = integerPart[i];
    if ((integerPart.length - i) % 3 === 0 && i !== 0) {
      formattedNum = ` ${digit}${formattedNum}`;
    } else {
      formattedNum = `${digit}${formattedNum}`;
    }
  }

  return `${formattedNum}${decimalPart}`;
};
export const compactFormat = (num: number): string => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(num);
};
