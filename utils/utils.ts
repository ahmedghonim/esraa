import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(input: string) {
  return input
    .trim()
    .replace(/[*+~.()'"!:@]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+$/, "");
}
