import "./Home.scss";

import React from "react";
import Columns from "../../components/Columns/Columns";

const HomePage: React.FC = () => {
  const featureTypes: string[] = ["pros", "cons"];

  return (
    <div className="Home">
      <h1>Is LinkedIn helpful for finding a job?</h1>
      <Columns featureTypes={featureTypes} />
    </div>
  );
};

export default HomePage;
