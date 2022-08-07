import React, { useState } from "react";
import { ActiveView } from "../../custom2.d";
import { createTheme, ThemeProvider } from "@mui/material";
import FileSystemView from "./FileSystemView/FileSystemView";
import HomeView from "./HomeView/HomeView";

const theme = createTheme({
    typography: {
        fontFamily: "Segoe UI",
        fontSize: 13,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: SegoeUI;
                    src:
                        local("Segoe UI"),
                        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2) format("woff2"),
                        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff) format("woff"),
                        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf) format("truetype");
                    font-weight: 400;
                },
                @font-face {
                    font-family: SegoeUI;
                    src:
                        local("Segoe UI Semibold"),
                        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff2) format("woff2"),
                        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff) format("woff"),
                        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.ttf) format("truetype");
                    font-weight: 600;
                }
        `,
        },
    },
});

const Nav: React.FC = () => {
    const [activeView, setActiveView] = useState<ActiveView>(
        ActiveView.FileSystemView
    );

    const changeView = (view: ActiveView) => {
        setActiveView(view);
    };

    let view;
    switch (activeView) {
        case ActiveView.HomeView:
            view = <HomeView openFileSystem={() => changeView(ActiveView.FileSystemView)}/>;
            break;
        case ActiveView.FileSystemView:
            view = (
                <FileSystemView close={() => changeView(ActiveView.HomeView)} />
            );
            break;
    }

    return <ThemeProvider theme={theme}>{view}</ThemeProvider>;
};

export default Nav;
