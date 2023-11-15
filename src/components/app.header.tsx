"use client";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
import styles from "../app/admin/admin.module.css";
import { getStogare, removeStogare } from "@/app/helper/stogare";

const drawerWidth = 240;

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

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
}

const AppHeader = (props: IProps) => {
  const { openDrawer, setOpenDrawer } = props;
  const router = useRouter();

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
    handleMenuClose();
    router.replace("/admin/profile");
  };
  const handleLogout = () => {
    handleMenuClose();
    router.replace("/");
    removeStogare("currentUser");
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

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const currentUserString = getStogare("currentUser");
  useEffect(() => {
    if (currentUserString) {
      setCurrentUser(JSON.parse(currentUserString));
    }
  }, [currentUserString]);

  return (
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
          <span className={styles.span} onClick={handleNotificationClick}>
            <div role="button" className="position-relative">
              <NotificationsNoneSharpIcon className="fs-4" />
              <span className="badge bg-primary rounded-circle p-1 position-absolute translate-middle">
                4
              </span>
            </div>
          </span>
          {openNotification && (
            <Menu
              id="menu-appbar-notification"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={openNotification}
              anchorEl={anchorElNotification}
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
                      <p className="fs-6">I want to remind everyone that ...</p>
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

          <span className={styles.span} onClick={handleMessengerClick}>
            <div role="button" className="position-relative">
              <MessageSharpIcon className="fs-4" />
              <span className="badge bg-primary rounded-circle p-1 position-absolute translate-middle">
                3
              </span>
            </div>
          </span>
          {openMessenger && (
            <Menu
              id="menu-appbar-messenger"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={openMessenger}
              anchorEl={anchorElMessenger}
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
                <div>{currentUser?.username}</div>
                <div>{currentUser?.email}</div>
              </div>
              <ArrowDropDownIcon />
            </div>
          </span>
          {openDropdown && (
            <Menu
              id="menu-appbar-dropdown"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              anchorEl={anchorElMenu} // Set anchorEl to the state value
              open={openDropdown}
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
                <div>Logout</div>
              </MenuItem>
            </Menu>
          )}
        </div>
      </div>
    </AppBar>
  );
};

export default AppHeader;
