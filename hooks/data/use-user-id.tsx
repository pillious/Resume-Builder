import useSWR from "swr";
import { IUser, guid } from "../../custom2";
import fetcher from "../../utils/fetcher";

const useUserId = (userId: guid | null) => {
    const { data, error } = useSWR(`/api/getUserId?userId=${userId}`, fetcher);

    const isLoading = !error && !data;
    const isError = error;
    const isSuccessful =
        !isError && !isLoading && data !== undefined && "data" in data;
    let payload: IUser | null;
    if (
        isSuccessful &&
        "user" in data.data &&
        data.data.user &&
        "email" in data.data.user
    ) {
        payload = data.data.user as IUser;
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

export default useUserId;
