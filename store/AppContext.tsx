import { union } from "lodash";
import { createContext, useState } from "react";
import { guid } from "../custom2";

interface IProps {
    children: JSX.Element;
}

interface IAppContext {
    activeResumeId: guid | null;
    onActiveResumeChange: (id: guid) => void;
    fileIds: guid[];
    onFileIdsChange: (ids: guid | guid[]) => void;
}

const defaultValues: IAppContext = {
    activeResumeId: null,
    onActiveResumeChange: () => ({}),
    fileIds: [],
    onFileIdsChange: () => ({}),
};

const AppContext = createContext<IAppContext>(defaultValues);

export const AppContextProvider: React.FC<IProps> = (props) => {
    const [activeResumeId, setActiveResumeId] = useState(
        defaultValues.activeResumeId
    );
    const [fileIds, setFileIds] = useState(defaultValues.fileIds);

    const updateActiveResumeId = (id: guid) => setActiveResumeId(id);

    const updateFileIds = (ids: guid | guid[]) => {
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

export default AppContext;
