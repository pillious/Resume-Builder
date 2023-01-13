import { createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";

interface IProps {
    children: JSX.Element;
}

// declare module "@mui/material/styles" {
//     interface Theme {
//         palette: {
//             muted: string;
//         };
//     }
//     // allow configuration using `createTheme`
//     interface ThemeOptions {
//         palette?: {
//             muted?: string;
//         };
//     }
// }

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
        // muted: {
        //     main: grey[300],
        // },
    },
});

const AppThemeProvider: React.FC<IProps> = (props) => {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default AppThemeProvider;
