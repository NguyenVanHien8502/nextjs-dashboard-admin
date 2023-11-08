"use client";
import { styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppSideBar from "@/components/app.sideBar";
import AppHeader from "@/components/app.header";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppHeader />
        <AppSideBar />
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
