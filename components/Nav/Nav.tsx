import React, { useState } from "react";
import FileSystemView from "./FileSystemView/FileSystemView";
import HomeView from "./HomeView/HomeView";

enum ActiveView {
    HomeView = 0,
    FileSystemView = 1,
}

const Nav: React.FC = () => {
    const [activeView, setActiveView] = useState<ActiveView>(ActiveView.FileSystemView);

    switch (activeView) {
        case ActiveView.HomeView:
            return <HomeView />
        case ActiveView.FileSystemView:
            return <FileSystemView />
    }
};

export default Nav;
