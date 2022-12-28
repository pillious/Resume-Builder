import { createContext, useState, useCallback, useMemo } from "react";
import { mutate } from "swr";
import { guid, IFile } from "../custom2";
import fetcher from "../utils/fetcher";
import { Pdf } from "../utils/pdfgen";

interface IProps {
    children: JSX.Element;
}

// Data structure (probably array) to store resumes/previews -> keep track of open tabs.
// maybe just store ids in one array, and the actual components in another array?

interface IAppContext {
    activeResumeId: guid | null;
    isPreviewActive: boolean;
    activeResumeObj: { file: IFile | null; pdf: Pdf };
    fileIds: guid[]; // unused
    updateFileIds: (ids: guid | guid[]) => void; // unused
    updateActiveResumeId: (id: guid | null) => void;
    updateActiveResumeObj: (file: IFile | null) => void;
    deleteFile: (id: guid) => void;
    renameFile: (id: guid, name: string) => void;
    downloadFile: (id?: guid) => void;
    openPreview: () => void;
}

const defaultValues: IAppContext = {
    activeResumeId: null,
    isPreviewActive: false,
    activeResumeObj: { file: null, pdf: new Pdf() },
    fileIds: [],
    updateFileIds: () => ({}),
    updateActiveResumeId: () => ({}),
    updateActiveResumeObj: () => ({}),
    deleteFile: () => ({}),
    renameFile: () => ({}),
    downloadFile: () => ({}),
    openPreview: () => ({}),
};

// useCallback & useMemo -> reduces unneccessary component re-renders.
const AppContext = createContext<IAppContext>(defaultValues);

export const AppContextProvider: React.FC<IProps> = (props) => {
    const [activeResumeId, setActiveResumeId] = useState(
        defaultValues.activeResumeId
    );
    const [isPreviewActive, setIsPreviewActive] = useState(
        defaultValues.isPreviewActive
    );
    const [activeResumeObj, setActiveResumeObj] = useState(
        defaultValues.activeResumeObj
    );
    const [fileIds, setFileIds] = useState(defaultValues.fileIds);

    const updateActiveResumeObj = useCallback(
        async (file: IFile | null) => {
            const pdf = file
                ? (
                      await activeResumeObj.pdf
                          .reset()
                          .loadAndSetFont(
                              "/fonts/Proxima-Nova-Reg.ttf",
                              "Proxima-Nova-Reg",
                              "normal",
                              400
                          )
                  ).generate(file)
                : activeResumeObj.pdf.reset();
            setActiveResumeObj({ file, pdf });
        },
        [activeResumeObj.pdf]
    );

    const updateActiveResumeId = useCallback(
        (id: guid | null) => {
            setActiveResumeId(id);
            updateActiveResumeObj(null);
        },
        [updateActiveResumeObj]
    );

    const openPreview = useCallback(() => {
        if (activeResumeId) setIsPreviewActive((prev) => !prev);
    }, [activeResumeId]);

    const updateFileIds = useCallback(
        (ids: guid | guid[]) => {
            if (typeof ids === "string") {
                if (fileIds.indexOf(ids) != -1)
                    setFileIds((prev) => [...prev, ids]);
            } else if (Array.isArray(ids)) {
                setFileIds((prev) => [...prev, ...ids]);
            }
        },
        [fileIds]
    );

    /**
     * These file actions can be accessed globally and are saved immediately.
     */
    // Delete file
    const deleteFile = useCallback(
        async (id: guid) => {
            if (id) {
                await fetcher("/api/deleteResumeById", {
                    method: "POST",
                    body: JSON.stringify({ fileId: id }),
                });
                if (id === activeResumeId) updateActiveResumeId(null);
                mutate("/api/getResumeIds"); // update filesystem.
            }
        },
        [activeResumeId, updateActiveResumeId]
    );

    // Rename file
    const renameFile = useCallback(
        (id: guid, name: string) => {
            if (id && name) {
                fetcher("/api/updateResumeName", {
                    method: "POST",
                    body: JSON.stringify({ fileId: id, fileName: name }),
                });
                mutate("/api/getResumeIds"); // update filesystem.

                // update active resume
                if (id === activeResumeId)
                    mutate(["/api/getResumeById", `?id=${activeResumeId}`]);
            }
        },
        [activeResumeId]
    );

    const downloadFile = useCallback(
        (id?: guid) => {
            // const fileId = id ?? activeResumeId ?? null;
            const fileId = id ?? activeResumeId ?? null;

            if (fileId) {
                activeResumeObj.pdf.download(activeResumeObj.file?.name);
            }
        },
        [activeResumeId, activeResumeObj]
    );

    const contextValue = useMemo(
        () => ({
            activeResumeId,
            isPreviewActive,
            activeResumeObj,
            fileIds,
            updateFileIds,
            updateActiveResumeId,
            updateActiveResumeObj,
            deleteFile,
            renameFile,
            downloadFile,
            openPreview,
        }),
        [
            activeResumeId,
            isPreviewActive,
            activeResumeObj,
            fileIds,
            updateFileIds,
            updateActiveResumeId,
            updateActiveResumeObj,
            deleteFile,
            renameFile,
            downloadFile,
            openPreview,
        ]
    );

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;
