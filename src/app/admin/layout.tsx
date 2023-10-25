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
  const [open, setOpen] = useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openDropdown, setOpenDropdown] = useState(false);
  const handleProfile = () => {};
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("You have successfully logouted");
    router.replace("/");
  };

  const [openNotification, setOpenNotification] = useState(false);
  const [openMessenger, setOpenMessenger] = useState(false);

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
              >
                <LogoDevSharpIcon />
                <div>NiceAdmin</div>
              </Typography>
            </Toolbar>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "40px",
                marginRight: "20px",
              }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#E9FFE1",
                  width: "300px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    border: "none",
                    backgroundColor: "#E9FFE1",
                    outline: "none",
                    width: "240px",
                  }}
                />
                <span style={{ cursor: "pointer" }}>
                  <SearchIcon />
                </span>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setOpenNotification(!openNotification)}
              >
                <div role="button" className="position-relative">
                  <NotificationsNoneSharpIcon className="fs-4" />
                  <span className="badge bg-primary rounded-circle p-1 position-absolute translate-middle">
                    4
                  </span>
                </div>
                {openNotification && (
                  <Menu
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: 20,
                      horizontal: 1225,
                    }}
                    open={Boolean(openNotification)}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    style={{
                      marginTop: "40px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 20px",
                        gap: "10px",
                      }}
                    >
                      <p>You have 4 news notifications</p>
                      <button
                        style={{
                          marginBottom: "14px",
                          border: "none",
                          borderRadius: "12px",
                          backgroundColor: "blue",
                        }}
                      >
                        View All
                      </button>
                    </div>
                    <MenuItem
                      style={{
                        height: "100px",
                        width: "400px",
                        display: "flex",
                        justifyContent: "flex-start",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ marginRight: "15px" }}>
                          <CampaignIcon />
                        </div>
                        <div
                          style={{
                            marginLeft: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <div>
                            <h5>Hary Maxguire</h5>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px" }}>
                              I want to remind everyone that ...
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem
                      style={{
                        height: "100px",
                        width: "400px",
                        display: "flex",
                        justifyContent: "flex-start",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ marginRight: "15px" }}>
                          <CampaignIcon />
                        </div>
                        <div
                          style={{
                            marginLeft: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <div>
                            <h5>Dicta reprehenderit</h5>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px" }}>
                              Quae dolorem earum veritatis oditseno
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem
                      style={{
                        height: "100px",
                        width: "400px",
                        display: "flex",
                        justifyContent: "flex-start",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ marginRight: "15px" }}>
                          <CampaignIcon />
                        </div>
                        <div
                          style={{
                            marginLeft: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <div>
                            <h5>Lorem Ipsum</h5>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px" }}>
                              Quae dolorem earum veritatis oditseno
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem
                      style={{
                        height: "100px",
                        width: "400px",
                        display: "flex",
                        justifyContent: "flex-start",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ marginRight: "15px" }}>
                          <CampaignIcon />
                        </div>
                        <div
                          style={{
                            marginLeft: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <div>
                            <h5>Atque rerum nesciunt</h5>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px" }}>
                              Quae dolorem earum veritatis oditseno
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>3 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Link href={"/admin"}>Show all notifications</Link>
                    </div>
                  </Menu>
                )}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setOpenMessenger(!openMessenger)}
              >
                <div role="button" className="position-relative">
                  <MessageSharpIcon className="fs-4" />
                  <span className="badge bg-primary rounded-circle p-1 position-absolute translate-middle">
                    3
                  </span>
                </div>
                {openMessenger && (
                  <Menu
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: 20,
                      horizontal: 1275,
                    }}
                    open={Boolean(openMessenger)}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    style={{
                      marginTop: "40px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 20px",
                        gap: "10px",
                      }}
                    >
                      <p>You have 3 news messages</p>
                      <button
                        style={{
                          marginBottom: "14px",
                          border: "none",
                          borderRadius: "12px",
                          backgroundColor: "blue",
                        }}
                      >
                        View All
                      </button>
                    </div>
                    <MenuItem
                      style={{
                        height: "100px",
                        width: "400px",
                        display: "flex",
                        justifyContent: "flex-start",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <Image
                            src="/images/avatar.jpg"
                            alt="avatar"
                            height={70}
                            width={70}
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div
                          style={{
                            marginLeft: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <div>
                            <h5>Hary Maxguire</h5>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px" }}>Hello everyone</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>6 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem
                      style={{
                        height: "100px",
                        width: "400px",
                        display: "flex",
                        justifyContent: "flex-start",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <Image
                            src="/images/avatar.jpg"
                            alt="avatar"
                            height={70}
                            width={70}
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div
                          style={{
                            marginLeft: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <div>
                            <h5>Paul Pogba</h5>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px" }}>Hi everyone</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>8 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem
                      style={{
                        height: "100px",
                        width: "400px",
                        display: "flex",
                        justifyContent: "flex-start",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <Image
                            src="/images/avatar.jpg"
                            alt="avatar"
                            height={70}
                            width={70}
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div
                          style={{
                            marginLeft: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <div>
                            <h5>Hary Kane</h5>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px" }}>Hello world</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px" }}>9 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Link href={"/admin"}>Show all messages</Link>
                    </div>
                  </Menu>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <Image
                  src="/images/avatar.jpg"
                  alt="avatar"
                  height={35}
                  width={35}
                  style={{ borderRadius: "50%" }}
                />
                <div>James Cameron</div>
                <ArrowDropDownIcon />
                {openDropdown && (
                  <Menu
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(openDropdown)}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    style={{
                      marginTop: "40px",
                    }}
                  >
                    <MenuItem
                      onClick={handleProfile}
                      style={{
                        height: "40px",
                        width: "200px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div>Profile</div>
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      style={{
                        height: "40px",
                        width: "200px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                )}
              </div>
            </div>
          </div>
        </AppBar>

        <Drawer variant="permanent" open={open}>
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
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
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
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => router.replace("/admin/user")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
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
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
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
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  );
}
