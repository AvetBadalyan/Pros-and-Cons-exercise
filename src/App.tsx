import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/Home";
import SingleFeaturePage from "./Pages/SingleFeaturePage/SingleFeaturePage";
import { useSelector } from "react-redux";
import { RootState } from "./Store/store";

const App: React.FC = () => {
  const features = useSelector((state: RootState) => state.featuresSlice);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage features={features} />} />
        <Route
          path="/features/:featureType/:featureId"
          element={<SingleFeaturePage features={features} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
