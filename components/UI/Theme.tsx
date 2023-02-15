import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Lato } from "@next/font/google";

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

const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });

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
        fontFamily: lato.style.fontFamily,
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
