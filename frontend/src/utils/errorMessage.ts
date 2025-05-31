import type { AxiosError } from "axios";

export function extractAxiosErrorMessage(error: unknown, fallback: string): string {
    const err = error as AxiosError<{ error: string }>;
    return err.response?.data?.error || fallback;
}