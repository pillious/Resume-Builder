import useSWR from "swr";
import { guid } from "../../custom2";
import fetcher from "../../utils/fetcher";

const useResumeIds = (userId: guid | null) => {
    const { data, error } = useSWR(
        `/api/getResumeIds?userId=${userId}`,
        fetcher
    );

    const isLoading = !error && !data;
    const isError = error;
    const isSuccessful =
        !isError && !isLoading && data !== undefined && "data" in data;
    const payload: { name: string; id: guid }[] =
        isSuccessful &&
        "fileIdentifiers" in data.data &&
        data.data.fileIdentifiers !== undefined
            ? data.data.fileIdentifiers
            : [];

    return {
        data: payload,
        isSuccessful,
        isLoading,
        isError,
    };
};

export default useResumeIds;
