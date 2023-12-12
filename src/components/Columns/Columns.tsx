import React, { useMemo } from "react";
import SingleColumn from "./SIngleColumn/SingleColumn";
import { FeaturesState } from "../../Store/FeatureSlice/actions/types";

interface ColumnsProps {
  features: FeaturesState;
}

const Columns: React.FC<ColumnsProps> = ({ features }) => {
  const featureTypes = useMemo(() => Object.keys(features), [features]);

  return (
    <div className="columns">
      {featureTypes.map((featureType: string) => (
        <SingleColumn
          key={featureType}
          featureType={featureType}
          featureTypes={featureTypes}
          features={features}
        />
      ))}
    </div>
  );
};

export default Columns;
