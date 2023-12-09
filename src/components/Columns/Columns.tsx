import React, { useMemo } from "react";
import SingleColumn from "./SIngleColumn/SingleColumn";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

const Columns: React.FC = () => {
  const features = useSelector((state: RootState) => state.featuresSlice);
  const featureTypes = useMemo(() => Object.keys(features), [features]);

  return (
    <div className="columns">
      {featureTypes.map((featureType: string) => (
        <SingleColumn
          key={featureType}
          featureType={featureType}
          featureTypes={featureTypes}
        />
      ))}
    </div>
  );
};

export default Columns;
