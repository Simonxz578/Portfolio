const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(value: string): string {
  if (/^(?:[a-z]+:|#|\/\/)/i.test(value)) {
    return value;
  }

  const path = value.startsWith("/") ? value : "/" + value;
  return basePath + path;
}
