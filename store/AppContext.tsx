import { union } from "lodash";
import { createContext, useState } from "react";
import { mutate } from "swr";
import { guid } from "../custom2";
import fetcher from "../utils/fetcher";

interface IProps {
    children: JSX.Element;
}

interface IAppContext {
    activeResumeId: guid | null;
    onActiveResumeChange: (id: guid) => void;
    fileIds: guid[];
    onFileIdsChange: (ids: guid | guid[]) => void;
    deleteFile: (id: guid) => void;
    renameFile: (id: guid, name: string) => void;
}

const defaultValues: IAppContext = {
    activeResumeId: null,
    onActiveResumeChange: () => ({}),
    fileIds: [],
    onFileIdsChange: () => ({}),
    deleteFile: () => ({}),
    renameFile: () => ({}),
};

const AppContext = createContext<IAppContext>(defaultValues);

export const AppContextProvider: React.FC<IProps> = (props) => {
    const [activeResumeId, setActiveResumeId] = useState(
        defaultValues.activeResumeId
    );
    const [fileIds, setFileIds] = useState(defaultValues.fileIds);

    const updateActiveResumeId = (id: guid | null) => setActiveResumeId(id);

    const updateFileIds = (ids: guid | guid[]) => {
        if (typeof ids === "string") {
            if (fileIds.indexOf(ids) != -1)
                setFileIds((prev) => [...prev, ids]);
        } else if (Array.isArray(ids)) {
            setFileIds((prev) => union(prev, ids));
        }
    };

    /**
     * These file actions can be accessed globally and are saved immediately.
     */
    // Delete file
    const deleteFile = async (id: guid) => {
        if (id) {
            await fetcher("/api/deleteResumeById", "", {
                method: "POST",
                body: JSON.stringify({ fileId: id }),
            });
            if (id === activeResumeId) updateActiveResumeId(null);
            mutate("/api/getResumeIds"); // update filesystem.
        }
    };

    // Rename file
    const renameFile = (id: guid, name: string) => {
        if (id && name) {
            fetcher("/api/updateResumeName", "", {
                method: "POST",
                body: JSON.stringify({ fileId: id, fileName: name }),
            });
            mutate("/api/getResumeIds"); // update filesystem.

            // update active resume
            if (id === activeResumeId)
                mutate(["/api/getResumeById", `?id=${activeResumeId}`]);
        }
    };

    return (
        <AppContext.Provider
            value={{
                activeResumeId,
                onActiveResumeChange: updateActiveResumeId,
                fileIds,
                onFileIdsChange: updateFileIds,
                deleteFile,
                renameFile,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;
