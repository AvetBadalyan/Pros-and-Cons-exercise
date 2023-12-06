import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/Home";
import SingleFeaturePage from "./Pages/SingleFeaturePage/SingleFeaturePage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/features/:featureType/:featureId"
          element={<SingleFeaturePage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
