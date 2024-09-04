import { useState } from "react";

// This function is manages only the input value
function useChangeInputData(initialState) {
  const [state, setState] = useState(initialState);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return {
    state,
    handleChange,
  };
}

export default useChangeInputData;
