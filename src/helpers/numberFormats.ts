export function formatMillionToK(num: number): string | number {
  const isMillion = Math.abs(num) > 999;
  const kUnits = Math.sign(num) * (Math.abs(num) / 1000);
  return isMillion ? `${kUnits.toFixed(1)}k` : Math.sign(num) * Math.abs(num);
}
