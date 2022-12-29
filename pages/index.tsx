import { useEffect } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Box from "@mui/material/Box";
import { AppContextProvider } from "../store/AppContext";
import ResumeEditor from "../components/ResumeEditor/ResumeEditor";
import Nav from "../components/Nav/Nav";

// import TabList from "../components/TabList/TabList";

const Previewer = dynamic(import("../components/Previewer/Previewer"), {
    ssr: false,
});

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            // console.log(session);
        }
    }, [session, status]);

    if (status === "unauthenticated") {
        router.push("/api/auth/signin");
    }

    // <Box><TabList /></Box>

    return (
        <AppContextProvider>
            <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
                {status === "authenticated" && (
                    <>
                        <Nav />
                        <ResumeEditor />
                        <Previewer />
                    </>
                )}
            </Box>
        </AppContextProvider>
    );
};

export default Home;
