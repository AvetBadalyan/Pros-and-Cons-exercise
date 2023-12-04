import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/Home";
import SingleFeaturePage from "./Pages/SingleFeaturePage/SingleFeaturePage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/features/:featureType/:featureId"
            element={<SingleFeaturePage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
