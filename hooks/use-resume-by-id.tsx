import useSWR from "swr";
import fetcher from "../utils/fetcher";

const useResumeById = (activeResumeId: string | null) => {
    const { data, error } = useSWR(
        ["/api/getResumeById", `?id=${activeResumeId}`],
        fetcher
    );
    
    const isLoading = !error && !data;
    const isError = error;
    const isSuccessful =
        !isError && !isLoading && data != undefined && "data" in data;
    const payload =
        isSuccessful && data.data.file != undefined ? data.data.file : null;

    return {
        data: payload,
        isSuccessful,
        isLoading,
        isError,
    };
};

export default useResumeById;
