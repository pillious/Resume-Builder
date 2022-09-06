import type { NextPage } from "next";
import Box from "@mui/material/Box";
import { AppContextProvider } from "../store/AppContext";
import ResumeEditor from "../components/ResumeEditor/ResumeEditor";
import Nav from "../components/Nav/Nav";
// import TabList from "../components/TabList/TabList";

const Home: NextPage = () => {
    return (
        <AppContextProvider>
            <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
                <Nav />
                <Box>
                    {/* <TabList /> */}
                    <ResumeEditor />
                </Box>
            </Box>
        </AppContextProvider>
    );
};

export default Home;
