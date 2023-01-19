export function classnames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
