import React, { useMemo } from "react";
import FeatureItem from "./FeatureItem/FeatureItem";
import {
  FeaturesState,
  SingleFeature,
} from "../../../../Store/FeatureSlice/actions/types";
import "./FeatureList.scss";

interface FeatureListProps {
  featureType: string;
  featureTypes: string[];
  features: FeaturesState;
}

const FeatureList: React.FC<FeatureListProps> = ({
  featureType,
  featureTypes,
  features,
}) => {
  const filteredFeatures = useMemo(
    () =>
      features[featureType].filter(
        (singleFeature: SingleFeature) =>
          singleFeature.featureType === featureType
      ),
    [features, featureType]
  );

  return (
    <div className="feature-list">
      {filteredFeatures.map((singleFeature: SingleFeature, index: number) => (
        <FeatureItem
          key={singleFeature.id}
          feature={singleFeature}
          featureTypes={featureTypes}
          features={features}
          index={index}
        />
      ))}
    </div>
  );
};

export default FeatureList;
