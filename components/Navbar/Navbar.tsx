import { MouseEvent, useContext, useState } from "react";
import { signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import AdbIcon from "@mui/icons-material/Adb";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { useSession } from "next-auth/react";
import AuthenticatedMenu from "./AuthenticatedMenu";
import UnauthenticatedMenu from "./UnauthenticatedMenu";
import { useRouter } from "next/router";
import AppContext from "../../store/AppContext";

const Navbar: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isNavActive, toggleNav } = useContext(AppContext);

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            {isNavActive ? (
                <AppBar
                    position="static"
                    sx={{ boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.1)" }}
                >
                    <Container maxWidth={false} sx={{ pl: "0 !important" }}>
                        <Toolbar
                            disableGutters
                            sx={{
                                minHeight: "48px !important",
                                maxHeight: "48px",
                                height: "48px",
                            }}
                        >
                            <IconButton
                                aria-label="hide navbars"
                                title="Hide navbars"
                                sx={{
                                    mx: 1.5,
                                    transform: "rotate(90deg)",
                                    color: "#fff",
                                }}
                                onClick={toggleNav}
                            >
                                <OpenInFullIcon />
                            </IconButton>
                            <Divider orientation="vertical" />
                            <AdbIcon sx={{ mx: 1 }} />
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
                                        handleSignIn={() =>
                                            console.log("TODO: signin")
                                        }
                                        handleRegister={() =>
                                            console.log("TODO: register")
                                        }
                                    />
                                )}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            ) : (
                <IconButton
                    aria-label="show navbars"
                    title="Show navbars"
                    sx={{
                        transform: "rotate(90deg)",
                        color: "#000",
                        zIndex: 100,
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    onClick={toggleNav}
                >
                    <CloseFullscreenIcon />
                </IconButton>
            )}
        </>
    );
};
export default Navbar;
