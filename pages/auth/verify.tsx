import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Button, Typography } from "@mui/material";

const Verification: React.FC = () => {
    const { status } = useSession();
    const router = useRouter();

    if (status === "authenticated") router.replace("/");

    return (
        <>
            {status === "unauthenticated" && (
                <Box
                    sx={{
                        mt: 4,
                    }}
                >
                    <Typography
                        fontSize={20}
                        textAlign="center"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={2}
                    >
                        <div>Please verify your Google account email.</div>
                        <Link
                            href="https://support.google.com/accounts/answer/63950"
                            target="blank"
                            type="button"
                        >
                            Instructions
                        </Link>
                        <Button variant="outlined" color="info">
                            Return to Sign In
                        </Button>
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default Verification;
