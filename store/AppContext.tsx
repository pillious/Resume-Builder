import { createContext, useState, useCallback, useMemo } from "react";
import { useSWRConfig } from "swr";
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
    areToolsActive: boolean;
    isNavActive: boolean;
    updateFileIds: (ids: guid | guid[]) => void; // unused
    updateActiveResumeId: (id: guid | null) => void;
    updateActiveResumeObj: (file: IFile | null) => void;
    deleteFile: (id: guid, userId: guid) => Promise<void>;
    renameFile: (id: guid, name: string, userId: guid) => Promise<void>;
    downloadFile: (id?: guid) => void;
    copyFile: (id: guid, userId: guid) => Promise<void>;
    togglePreview: () => void;
    toggleTools: () => void;
    toggleNav: () => void;
}

const defaultValues: IAppContext = {
    activeResumeId: null,
    isPreviewActive: false,
    activeResumeObj: { file: null, pdf: new Pdf() },
    fileIds: [],
    areToolsActive: true,
    isNavActive: true,
    updateFileIds: () => ({}),
    updateActiveResumeId: () => ({}),
    updateActiveResumeObj: () => ({}),
    deleteFile: async () => {
        return;
    },
    renameFile: async () => {
        return;
    },
    downloadFile: () => ({}),
    copyFile: async () => {
        return;
    },
    togglePreview: () => ({}),
    toggleTools: () => ({}),
    toggleNav: () => ({}),
};

// useCallback & useMemo -> reduces unneccessary component re-renders.
const AppContext = createContext<IAppContext>(defaultValues);

export const AppContextProvider: React.FC<IProps> = (props) => {
    const { mutate } = useSWRConfig();

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
    const [areToolsActive, setAreToolsActive] = useState(
        defaultValues.areToolsActive
    );
    const [isNavActive, setIsNavActive] = useState(defaultValues.isNavActive);

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

    const togglePreview = useCallback(() => {
        if (activeResumeId) setIsPreviewActive((prev) => !prev);
    }, [activeResumeId]);

    const updateFileIds = useCallback(
        (ids: guid | guid[]) => {
            if (typeof ids === "string") {
                if (fileIds.indexOf(ids) !== -1)
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
        async (id: guid, userId: guid) => {
            if (id) {
                await fetcher("/api/deleteResumeById", {
                    method: "POST",
                    body: JSON.stringify({ fileId: id, userId }),
                }).then(() => {
                    mutate(`/api/getResumeIds?userId=${userId}`);
                    if (id === activeResumeId) updateActiveResumeId(null);
                });
            }
        },
        [activeResumeId, mutate, updateActiveResumeId]
    );

    // Rename file
    const renameFile = useCallback(
        async (id: guid, name: string, userId: guid) => {
            if (id && name && userId) {
                await fetcher("/api/updateResumeName", {
                    method: "POST",
                    body: JSON.stringify({
                        fileId: id,
                        fileName: name,
                        userId,
                    }),
                }).then(() => mutate(`/api/getResumeIds?userId=${userId}`));
                // await mutate("/api/getResumeIds");
                // mutate(["/api/getResumeById", `?id=${id}`]);
            }
        },
        [mutate]
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

    const copyFile = useCallback(
        async (id: guid, userId: guid) => {
            if (id && userId) {
                await fetcher("/api/copyResume", {
                    method: "POST",
                    body: JSON.stringify({ fileId: id, userId }),
                }).then(() => mutate(`/api/getResumeIds?userId=${userId}`));
            }
        },
        [mutate]
    );

    const toggleTools = useCallback(
        () => setAreToolsActive((prev) => !prev),
        []
    );

    const toggleNav = useCallback(() => setIsNavActive((prev) => !prev), []);

    const contextValue = useMemo(
        () => ({
            activeResumeId,
            isPreviewActive,
            activeResumeObj,
            fileIds,
            areToolsActive,
            isNavActive,
            updateFileIds,
            updateActiveResumeId,
            updateActiveResumeObj,
            deleteFile,
            renameFile,
            downloadFile,
            copyFile,
            togglePreview,
            toggleTools,
            toggleNav,
        }),
        [
            activeResumeId,
            isPreviewActive,
            activeResumeObj,
            fileIds,
            areToolsActive,
            isNavActive,
            updateFileIds,
            updateActiveResumeId,
            updateActiveResumeObj,
            deleteFile,
            renameFile,
            downloadFile,
            copyFile,
            togglePreview,
            toggleTools,
            toggleNav,
        ]
    );

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;
