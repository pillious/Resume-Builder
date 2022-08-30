import useSWR from "swr";
import { IFile } from "../../custom2";
import fetcher from "../../utils/fetcher";

const useResumeById = (activeResumeId: string | null) => {
    const { data, error } = useSWR(
        ["/api/getResumeById", `?id=${activeResumeId}`],
        fetcher
    );

    const isLoading = !error && !data;
    const isError = error;
    const isSuccessful =
        !isError && !isLoading && data != undefined && "data" in data;
    const payload: IFile | null =
        isSuccessful && "file" in data.data && data.data.file != undefined
            ? data.data.file
            : null;

    return {
        data: payload,
        isSuccessful,
        isLoading,
        isError,
    };
};

export default useResumeById;
