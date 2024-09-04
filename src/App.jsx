import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";

function App() {
  return (
    // easy peasy store proveder
    <StoreProvider store={store}>
      {/* React Router Provider */}
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
