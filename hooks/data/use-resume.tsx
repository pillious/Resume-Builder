/**
 * NOT IN BEING USED.>
 */

import useSWR from "swr";
import fetcher from "../../utils/fetcher";

// interface DataPayload<T> {
//     [key: string]: T;
// }

// interface DataResponse<T> {
//     data: T;
//     isLoading: boolean;
//     isError: unknown;
// }

// const useResume: <T>() => DataResponse<T> = () => {
//     const { data, error } = useSWR<DataPayload<T>>(`/api/getResumes`, fetcher);
//     return {
//         data,
//         isLoading: !error && !data,
//         isError: error,
//     }
// };

const useResume = () => {
    const { data, error } = useSWR("/api/getResumes", fetcher); 
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};

export default useResume;
