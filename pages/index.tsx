import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { AppContextProvider } from "../store/AppContext";
import ResumeEditor from "../components/ResumeEditor/ResumeEditor";
import Nav from "../components/Nav/Nav";
// import TabList from "../components/TabList/TabList";

const Previewer = dynamic(import("../components/Previewer/Previewer"), {
    ssr: false,
});

const Home: NextPage = () => {
    return (
        <AppContextProvider>
            
            <Box sx={{ display: "flex", width: "100%", height: "100%" }} >
                <Nav />
                {/* <Box><TabList /></Box> */}
                <ResumeEditor />
                <Previewer />
            </Box>
        </AppContextProvider>
    );
};

export default Home;
