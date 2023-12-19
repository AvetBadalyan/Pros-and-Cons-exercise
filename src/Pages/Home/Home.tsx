import "./Home.scss";

import React from "react";
import Columns from "../../components/Columns/Columns";
import { FeaturesState } from "../../Store/FeatureSlice/actions/types";
import { ToastContainer } from "react-toastify";

interface HomePageProps {
  features: FeaturesState;
}

const HomePage: React.FC<HomePageProps> = ({ features }) => {
  return (
    <div className="Home">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1>Is LinkedIn helpful for finding a job?</h1>
      <Columns features={features} />
    </div>
  );
};

export default HomePage;
