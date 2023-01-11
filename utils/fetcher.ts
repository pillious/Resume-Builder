import { ApiResponse } from "../types";

export default async function fetcher(
    url: RequestInfo,
    body?: RequestInit
): Promise<ApiResponse> {
    const res = await fetch(url, body);
    return await res.json();
}
