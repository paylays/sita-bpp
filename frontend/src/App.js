import React from "react";
import Main from "./Main";
import ScrolToTop from "./components/Elements/ScrolToTop";
import Loader from "./components/Elements/Loader";


const App = () => {

  return (
    <div className="App">
      <Main />
      <ScrolToTop />
      <Loader />
    </div>
  );
}


export default App;
