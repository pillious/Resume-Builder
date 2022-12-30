import { ApiResponse } from "../custom2";

export default async function fetcher(
    url: RequestInfo,
    body?: RequestInit
): Promise<ApiResponse> {
    const res = await fetch(url, body);
    return await res.json();
}
