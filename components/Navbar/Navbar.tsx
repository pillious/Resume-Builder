import { MouseEvent, useContext, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import {
    AppBar,
    Box,
    Divider,
    Toolbar,
    Typography,
    Container,
    IconButton,
    useTheme,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useSession } from "next-auth/react";
import AuthenticatedMenu from "./AuthenticatedMenu";
import UnauthenticatedMenu from "./UnauthenticatedMenu";
import { useRouter } from "next/router";
import AppContext from "../../store/AppContext";
import { navHeight } from "../../utils/constants";

const Navbar: React.FC = () => {
    const { data: session, status } = useSession();
    const { isNavActive, toggleNav } = useContext(AppContext);
    const router = useRouter();
    const theme = useTheme();

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
                                minHeight: `${navHeight}px !important`,
                                maxHeight: `${navHeight}px`,
                                height: `${navHeight}px`,
                            }}
                        >
                            <IconButton
                                aria-label="Hide navbars"
                                title="Hide navbars"
                                sx={{
                                    mx: 1.5,
                                    transform: "rotate(90deg)",
                                    color: theme.palette.info.main,
                                }}
                                onClick={toggleNav}
                            >
                                <OpenInFullIcon />
                            </IconButton>
                            <Divider orientation="vertical" />
                            <AdbIcon
                                sx={{
                                    mx: 1,
                                    color: theme.palette.info.main,
                                }}
                            />
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
                                    color: theme.palette.info.main,
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
                                        handleSignIn={signIn}
                                        handleRegister={signIn}
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
                        zIndex: 100,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        color: theme.palette.info.main,
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
