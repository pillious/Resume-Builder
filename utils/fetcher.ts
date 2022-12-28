import { ResponseError, ResponseSuccess } from "../custom2.d";

export default async function fetcher(
    url: RequestInfo,
    body?: RequestInit
): Promise<ResponseSuccess | ResponseError> {
    const res = await fetch(url, body);
    return await res.json();
}
