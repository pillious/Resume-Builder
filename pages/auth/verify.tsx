import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const Verification: React.FC = () => {
    const { status } = useSession();
    const router = useRouter();

    if (status === "authenticated") router.replace("/");

    return (
        <>
            {status === "unauthenticated" && (
                <Box sx={{ mx: "auto", mt: "2rem" }}>
                    <p>Please verify your Google account email.</p>
                    <Link
                        href="https://support.google.com/accounts/answer/63950"
                        target="blank"
                    >
                        Instructions
                    </Link>
                </Box>
            )}
        </>
    );
};

export default Verification;
