import useSWR from "swr";
import { guid, IFile } from "../../custom2";
import fetcher from "../../utils/fetcher";

const useResumeById = (activeResumeId: guid | null, userId: guid | null) => {
    const { data, error } = useSWR(
        `/api/getResumeById?id=${activeResumeId}&userId=${userId}`,
        fetcher
    );

    const isLoading = !error && !data;
    const isError = error;
    const isSuccessful =
        !isError && !isLoading && data !== undefined && "data" in data;
    let payload: IFile | null;
    if (
        isSuccessful &&
        "file" in data.data &&
        data.data.file &&
        "userId" in data.data.file
    ) {
        payload = data.data.file as IFile;
    } else {
        payload = null;
    }

    return {
        data: payload,
        isSuccessful,
        isLoading,
        isError,
    };
};

export default useResumeById;
