import React, { useContext } from "react";
import { ActiveView } from "../../enums";
import FileSystemView from "./FileSystemView/FileSystemView";
import HomeView from "./HomeView/HomeView";
import AppContext from "../../store/AppContext";

const Sidebar: React.FC = () => {
    const { isNavActive, activeSidebarView, updateActiveSidebarView } =
        useContext(AppContext);

    const changeView = (view: ActiveView) => {
        updateActiveSidebarView(view);
    };

    let view;
    switch (activeSidebarView) {
        case ActiveView.HomeView:
            view = (
                <HomeView
                    openFileSystem={() => changeView(ActiveView.FileSystemView)}
                />
            );
            break;
        case ActiveView.FileSystemView:
            view = (
                <FileSystemView close={() => changeView(ActiveView.HomeView)} />
            );
            break;
    }

    return <>{isNavActive && view}</>;
};

export default Sidebar;
