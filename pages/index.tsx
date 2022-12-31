import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useSession, signIn } from "next-auth/react";
import Box from "@mui/material/Box";
import ResumeEditor from "../components/ResumeEditor/ResumeEditor";
import Sidebar from "../components/Sidebar/Sidebar";
import AuthContext from "../store/AuthContext";
import fetcher from "../utils/fetcher";

// import TabList from "../components/TabList/TabList";

const Previewer = dynamic(import("../components/Previewer/Previewer"), {
    ssr: false,
});

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const { updateUserId } = useContext(AuthContext);

    useEffect(() => {
        const updateId = async () => {
            if (session && session.user && "email" in session.user) {
                const resp = await fetcher(
                    `/api/getUserId?email=${session.user?.email}`
                );

                if ("data" in resp && "user" in resp.data) {
                    updateUserId(resp.data.user._id);
                }
            }
        };

        if (status === "authenticated") updateId();
        else if (status === "unauthenticated") signIn();
    }, [session, status, updateUserId]);

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            {/* <Box><TabList /></Box> */}
            {status === "authenticated" && (
                <>
                    <Sidebar />
                    <ResumeEditor />
                    <Previewer />
                </>
            )}
        </Box>
    );
};

export default Home;
