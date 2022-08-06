// A wrapper for the native fetch(). Used by SWR.
export default async function fetcher<JSON = unknown>(
    url: RequestInfo,
    body?: RequestInit
): Promise<JSON> {
    const res = await fetch(url, body);
    return res.json();
}
