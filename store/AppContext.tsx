import { union } from "lodash";
import { createContext, useState } from "react";

interface IProps {
    children: JSX.Element;
}

interface IAppContext {
    activeResumeId: string | null;
    onActiveResumeChange?: (id: string) => void;
    fileIds: string[];
    onFileIdsChange?: (ids: string | string[]) => void;
}

const defaultValues: IAppContext = {
    activeResumeId: null,
    fileIds: [],
};

const AppContext = createContext<IAppContext>(defaultValues);

export const AppContextProvider: React.FC<IProps> = (props) => {
    const [activeResumeId, setActiveResumeId] = useState(
        defaultValues.activeResumeId
    );
    const [fileIds, setFileIds] = useState(defaultValues.fileIds);

    const updateActiveResumeId = (id: string) => setActiveResumeId(id);

    const updateFileIds = (ids: string | string[]) => {
        if (typeof ids === "string") {
            if (fileIds.indexOf(ids) != -1)
                setFileIds((prev) => [...prev, ids]);
        } else if (Array.isArray(ids)) {
            setFileIds((prev) => union(prev, ids));
        }
    };

    return (
        <AppContext.Provider
            value={{
                activeResumeId,
                onActiveResumeChange: updateActiveResumeId,
                fileIds,
                onFileIdsChange: updateFileIds,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
