import { action, persist } from "easy-peasy";

const ThemeModel = persist({
  darkMode: false,
  setDarkMode: action((state, payload) => {
    state.darkMode = payload;
  }),
});

export default ThemeModel;
