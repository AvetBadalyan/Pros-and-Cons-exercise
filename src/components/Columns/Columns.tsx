import React from "react";
import SingleColumn from "./SIngleColumn/SingleColumn";

interface ColumnsProps {
  featureTypes: string[];
}

const Columns: React.FC<ColumnsProps> = ({ featureTypes }) => (
  <div className="columns">
    {featureTypes.map((featureType: string) => (
      <SingleColumn key={featureType} featureType={featureType} />
    ))}
  </div>
);

export default Columns;
