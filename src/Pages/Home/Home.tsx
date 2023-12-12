import "./Home.scss";

import React from "react";
import Columns from "../../components/Columns/Columns";
import { FeaturesState } from "../../Store/FeatureSlice/actions/types";

interface HomePageProps {
  features: FeaturesState;
}

const HomePage: React.FC<HomePageProps> = ({ features }) => {
  return (
    <div className="Home">
      <h1>Is LinkedIn helpful for finding a job?</h1>
      <Columns features={features} />
    </div>
  );
};

export default HomePage;
