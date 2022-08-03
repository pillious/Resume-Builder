import type { NextPage } from "next";
import Box from "@mui/material/Box";
import ResumeEditor from "../components/ResumeEditor/ResumeEditor";
import Nav from "../components/Nav/Nav";

const Home: NextPage = () => {
    return (
        <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
            <Nav />
            <ResumeEditor />
        </Box>
    );
};

export default Home;
