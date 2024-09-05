import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    // easy peasy store proveder
    <StoreProvider store={store}>
      {/* show tost function */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* React Router Provider */}
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
