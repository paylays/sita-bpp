import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSetting } from "./store/setting/actions";
import AppRouter from "./router/AppRouter"; // Import router

import "./assets/scss/hope-ui.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/dark.scss";
import "./assets/scss/rtl.scss";
import "./assets/scss/customizer.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSetting());
  }, [dispatch]);

  return (
    <div className="App">
      <AppRouter /> {/* Router ada di dalam App */}
    </div>
  );
}

export default App;
