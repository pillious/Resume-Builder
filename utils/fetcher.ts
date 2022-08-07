// A wrapper for the native fetch(). (also needed by SWR).
// export default async function fetcher<JSON = unknown>(
//     url: RequestInfo,
//     body?: RequestInit
// ): Promise<JSON> {
//     const res = await fetch(url, body);
//     return res.json();
// }

import { ResponseError, ResponseSuccess } from "../custom2.d";

export default async function fetcher(
    url: RequestInfo,
    body?: RequestInit
): Promise<ResponseSuccess | ResponseError> {
    const res = await fetch(url, body);
    return await res.json();
}
