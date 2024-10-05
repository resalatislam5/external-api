import { Outlet } from "react-router-dom";
import Header from "../../shared/Header";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
function MainLayout() {
  // change dark mode and light mode useState
  const [darkMode, setDarkMode] = useState(false);
  // Toggle darkMode useState
  const changeDarkMode = () => setDarkMode(!darkMode);
  // dark mode and light mode theme
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      secondary: {
        main: darkMode ? "#202020" : "#c2c2c2",
        dark: "#000",
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
      <Container maxWidth="xl" sx={{ marginTop: "60px" }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default MainLayout;
