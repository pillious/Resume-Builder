import useSWR from "swr";
import fetcher from "../../utils/fetcher";

const useUserId = () => {
    const { data, error } = useSWR("/api/getUserId", fetcher);

    console.log({ data, error });

    const isLoading = !error && !data;
    const isError = error;
    const isSuccessful =
        !isError && !isLoading && data != undefined && "data" in data;
    const payload =
        isSuccessful && data.data.files != undefined ? data.data.files : [];

    return {
        data: payload,
        isSuccessful,
        isLoading,
        isError,
    };
};

export default useUserId;
