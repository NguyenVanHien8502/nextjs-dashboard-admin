"use client";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
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
import { useRouter } from "next/navigation";

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

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
}

const AppSideBar = (props: IProps) => {
  const { openDrawer, setOpenDrawer } = props;

  const router = useRouter();
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={openDrawer}>
      <DrawerHeader>
        <IconButton onClick={() => setOpenDrawer(false)}>
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
  );
};

export default AppSideBar;
