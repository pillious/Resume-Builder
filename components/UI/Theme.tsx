import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
    interface Palette {
        muted: Palette["primary"];
        overlay: string;
        white: string;
    }

    interface PaletteOptions {
        muted?: PaletteOptions["primary"];
        overlay?: string;
        white?: string;
    }
}

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#683fb5",
        },
        muted: {
            main: grey[500],
            dark: grey[700],
        },
        divider: "rgba(255, 255, 255, 0.25)",
        overlay: "rgba(255, 255, 255, 0.04)",
        white: "#fff",
    },
    typography: {
        fontFamily: "Segoe UI",
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

interface IProps {
    children: JSX.Element;
}

const AppThemeProvider: React.FC<IProps> = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline makes the app's background also dark */}
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
};

export default AppThemeProvider;
