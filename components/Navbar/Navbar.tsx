import { MouseEvent, useState } from "react";
import { signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { useSession } from "next-auth/react";
import AuthenticatedMenu from "./AuthenticatedMenu";
import UnauthenticatedMenu from "./UnauthenticatedMenu";
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="static"
            sx={{ boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.1)" }}
        >
            <Container maxWidth={false}>
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: "48px !important",
                        maxHeight: "48px",
                        height: "48px",
                    }}
                >
                    <AdbIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ flexGrow: 0 }}>
                        {status === "authenticated" && session.user ? (
                            <AuthenticatedMenu
                                profileImg={session.user.image}
                                profileName={session.user.name}
                                anchorElem={anchorElUser}
                                handleMenuOpen={handleOpenUserMenu}
                                handleMenuClose={handleCloseUserMenu}
                                handleSignOut={async () => {
                                    // improves logout user experience (https://next-auth.js.org/getting-started/client#signout)
                                    const data = await signOut({
                                        redirect: false,
                                        callbackUrl: "/auth/signin",
                                    });
                                    router.push(data.url);
                                }}
                            />
                        ) : (
                            <UnauthenticatedMenu
                                handleSignIn={() => console.log("TODO: signin")}
                                handleRegister={() =>
                                    console.log("TODO: register")
                                }
                            />
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
