import React, { useContext, useState } from "react";
import { ActiveView } from "../../enums";
import FileSystemView from "./FileSystemView/FileSystemView";
import HomeView from "./HomeView/HomeView";
import AppContext from "../../store/AppContext";

const Sidebar: React.FC = () => {
    const { isNavActive } = useContext(AppContext);

    const [activeView, setActiveView] = useState<ActiveView>(
        ActiveView.FileSystemView
    );

    const changeView = (view: ActiveView) => {
        setActiveView(view);
    };

    let view;
    switch (activeView) {
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
