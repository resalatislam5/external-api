import { Outlet } from "react-router-dom";
import Header from "../../shared/Header";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
function MainLayout() {
  // change dark mode and light mode action from easy-peasy
  const setDarkMode = useStoreActions(
    (actions) => actions.themeData.setDarkMode
  );
  // get theme state from easy-peasy
  const darkMode = useStoreState((state) => state.themeData.darkMode);

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
