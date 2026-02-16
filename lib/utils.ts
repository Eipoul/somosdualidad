export function cn(...inputs: Array<string | undefined | false | null>) {
  return inputs.filter(Boolean).join(" ");
}

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, "").trim();
}
