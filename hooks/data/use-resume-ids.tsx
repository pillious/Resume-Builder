import useSWR from "swr";
import { guid } from '../../custom2';
import fetcher from "../../utils/fetcher";

const useResumeIds = () => {
    const { data, error } = useSWR("/api/getResumeIds", fetcher);

    const isLoading = !error && !data;
    const isError = error;
    const isSuccessful =
        !isError && !isLoading && data != undefined && "data" in data;
    const payload: guid[] =
        isSuccessful && "fileIds" in data.data && data.data.fileIds != undefined
            ? data.data.fileIds
            : [];

    return {
        data: payload,
        isSuccessful,
        isLoading,
        isError,
    };
};

export default useResumeIds;
