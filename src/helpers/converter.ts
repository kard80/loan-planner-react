export function financeFormat(input: string): string {
    const num = Number(input);
    const result = (Math.round(num*100) / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
    return result;
  }

export function numberFormat(input: string): string {
    const result = input.replace(/,/g, '');
    return result;
  }