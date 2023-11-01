"use client";
import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewIcon from "@mui/icons-material/GridView";
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import CategoryIcon from "@mui/icons-material/Category";
import LogoDevSharpIcon from "@mui/icons-material/LogoDevSharp";
import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
import MessageSharpIcon from "@mui/icons-material/MessageSharp";
import Image from "next/image";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./admin.module.css";
import { Popover } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(
    null
  );
  const openDropdown = Boolean(anchorElMenu);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài menu
  };
  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };
  const handleProfile = () => {
    router.replace("/admin/profile");
  };
  const handleLogout = () => {
    router.replace("/");
    localStorage.removeItem("currentUser");
    toast.success("You have successfully logouted");
  };

  const [anchorElNotification, setAnchorElNotification] =
    useState<HTMLButtonElement | null>(null);
  const openNotification = Boolean(anchorElNotification);
  const handleNotificationClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElNotification(event.currentTarget);
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài menu
  };
  const handleNotificationClose = () => {
    setAnchorElNotification(null);
  };

  const [anchorElMessenger, setAnchorElMessenger] =
    useState<HTMLButtonElement | null>(null);
  const openMessenger = Boolean(anchorElMessenger);
  const handleMessengerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMessenger(event.currentTarget);
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài menu
  };
  const handleMessengerClose = () => {
    setAnchorElMessenger(null);
  };

  let fetchCurrentUser: string | null = null;
  let currentUserName: string | null = null;
  let currentUserEmail: string | null = null;
  if (typeof localStorage !== "undefined") {
    fetchCurrentUser = localStorage.getItem("currentUser");
    if (fetchCurrentUser !== null) {
      currentUserName = JSON.parse(fetchCurrentUser)?.username;
      currentUserEmail = JSON.parse(fetchCurrentUser)?.email;
    }
  } else {
    console.error("error: localStorage is undefined");
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={4}
          sx={{
            backgroundColor: "#33FFFF",
            color: "#2f2f2f",
          }}
        >
          <div className={styles.appbar_container}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpenDrawer(!openDrawer)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                className="d-flex align-items-center gap-1 mx-2"
              >
                <LogoDevSharpIcon />
                <div>NiceAdmin</div>
              </Typography>
            </Toolbar>
            <div className="d-flex align-items-center gap-5 mx-2">
              <div className={styles.search_container}>
                <input
                  className={styles.search}
                  type="text"
                  placeholder="Search..."
                />
                <span className={styles.span}>
                  <SearchIcon />
                </span>
              </div>
              <span className={styles.span} onClick={handleNotificationClick}>
                <div role="button" className="position-relative">
                  <NotificationsNoneSharpIcon className="fs-4" />
                  <span className="badge bg-primary rounded-circle p-1 position-absolute translate-middle">
                    4
                  </span>
                </div>
                {openNotification && (
                  <Menu
                    id="menu-appbar-notification"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    open={openNotification}
                    anchorEl={anchorElNotification}
                    onBlur={handleNotificationClose}
                    onClose={handleNotificationClose}
                    keepMounted
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "right",
                    }}
                    className="mt-5"
                  >
                    <div className={styles.title_container}>
                      <p>You have 4 news notifications</p>
                      <button className={styles.buttonViewAll}>View All</button>
                    </div>
                    <MenuItem className={styles.menuItem_container}>
                      <div className="d-flex mt-2 align-items-start justify-content-center">
                        <div className="me-3">
                          <CampaignIcon />
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-center align-items-start">
                          <div>
                            <h5>Hary Maxguire</h5>
                          </div>
                          <div>
                            <p className="fs-6">
                              I want to remind everyone that ...
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem className={styles.menuItem_container}>
                      <div className="d-flex mt-2 align-items-start justify-content-center">
                        <div className="me-3">
                          <CampaignIcon />
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-center align-items-start">
                          <div>
                            <h5>Dicta reprehenderit</h5>
                          </div>
                          <div>
                            <p className="fs-6">
                              Quae dolorem earum veritatis oditseno
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem className={styles.menuItem_container}>
                      <div className="d-flex mt-2 align-items-start justify-content-center">
                        <div className="me-3">
                          <CampaignIcon />
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-center align-items-start">
                          <div>
                            <h5>Lorem Ipsum</h5>
                          </div>
                          <div>
                            <p className="fs-6">
                              Quae dolorem earum veritatis oditseno
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem className={styles.menuItem_container}>
                      <div className="d-flex mt-2 align-items-start justify-content-center">
                        <div className="me-3">
                          <CampaignIcon />
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-center align-items-start">
                          <div>
                            <h5>Atque rerum nesciunt</h5>
                          </div>
                          <div>
                            <p className="fs-6">
                              Quae dolorem earum veritatis oditseno
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>3 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link href={"/admin"}>Show all notifications</Link>
                    </div>
                  </Menu>
                )}
              </span>
              <span className={styles.span} onClick={handleMessengerClick}>
                <div role="button" className="position-relative">
                  <MessageSharpIcon className="fs-4" />
                  <span className="badge bg-primary rounded-circle p-1 position-absolute translate-middle">
                    3
                  </span>
                </div>
                {openMessenger && (
                  <Menu
                    id="menu-appbar-messenger"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    open={openMessenger}
                    anchorEl={anchorElMessenger}
                    onBlur={handleMessengerClose}
                    onClose={handleMessengerClose}
                    keepMounted
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "right",
                    }}
                    className="mt-5"
                  >
                    <div className={styles.title_container}>
                      <p>You have 3 news messages</p>
                      <button className={styles.buttonViewAll}>View All</button>
                    </div>
                    <MenuItem className={styles.menuItem_container}>
                      <div className="d-flex mt-2 align-items-start justify-content-center">
                        <div>
                          <Image
                            src="/images/avatar.jpg"
                            alt="avatar"
                            height={70}
                            width={70}
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-center align-items-start">
                          <div>
                            <h5>Hary Maxguire</h5>
                          </div>
                          <div>
                            <p className="fs-6">Hello everyone</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>6 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem className={styles.menuItem_container}>
                      <div className="d-flex mt-2 align-items-start justify-content-center">
                        <div>
                          <Image
                            src="/images/avatar.jpg"
                            alt="avatar"
                            height={70}
                            width={70}
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-center align-items-start">
                          <div>
                            <h5>Paul Pogba</h5>
                          </div>
                          <div>
                            <p className="fs-6">Hi everyone</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>8 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem className={styles.menuItem_container}>
                      <div className="d-flex mt-2 align-items-start justify-content-center">
                        <div>
                          <Image
                            src="/images/avatar.jpg"
                            alt="avatar"
                            height={70}
                            width={70}
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-center align-items-start">
                          <div>
                            <h5>Hary Kane</h5>
                          </div>
                          <div>
                            <p className="fs-6">Hello world</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>10 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link href={"/admin"}>Show all messages</Link>
                    </div>
                  </Menu>
                )}
              </span>
              <span
                className={`d-flex align-items-center gap-3 ${styles.span}`}
                onClick={handleMenuClick}
              >
                <Image
                  src="/images/avatar.jpg"
                  alt="avatar"
                  height={35}
                  width={35}
                  style={{ borderRadius: "50%" }}
                />
                <div
                  style={{
                    width: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>{currentUserName}</div>
                    <div>{currentUserEmail}</div>
                  </div>
                  <ArrowDropDownIcon />
                </div>
                {openDropdown && (
                  <Menu
                    id="menu-appbar-dropdown"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    anchorEl={anchorElMenu} // Set anchorEl to the state value
                    open={openDropdown}
                    onBlur={handleMenuClose}
                    onClose={handleMenuClose}
                    keepMounted
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "center",
                    }}
                    className="mt-5"
                  >
                    <MenuItem
                      onClick={handleProfile}
                      className="d-flex justify-content-center"
                      style={{ height: "40px", width: "170px" }}
                    >
                      <div>Profile</div>
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      className="d-flex justify-content-center"
                      style={{ height: "40px", width: "170px" }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                )}
              </span>
            </div>
          </div>
        </AppBar>
        <Drawer variant="permanent" open={openDrawer}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              marginTop: "20px",
            }}
            onClick={() => router.replace("/admin")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  mr: openDrawer ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GridViewIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => router.replace("/admin/user")}
                sx={{
                  minHeight: 48,
                  justifyContent: openDrawer ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: openDrawer ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => router.replace("/admin/movie")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: openDrawer ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: openDrawer ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary="Movie" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => router.replace("/admin/category")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: openDrawer ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: openDrawer ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Category" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{ backgroundColor: "white" }}
        >
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  );
}
