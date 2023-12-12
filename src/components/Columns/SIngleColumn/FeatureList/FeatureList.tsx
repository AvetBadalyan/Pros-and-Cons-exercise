import { useEffect } from "react";
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
  useEffect(() => {
    const sendToLocalStorage = () => {
      try {
        localStorage.setItem("storedFeatures", JSON.stringify(features));
      } catch (error) {
        console.error("Failed to store data in localStorage:", error);
      }
    };
    window.addEventListener("beforeunload", sendToLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", sendToLocalStorage);
    };
  }, [features]);

  return (
    <div className="feature-list">
      {features[featureType].map(
        (singleFeature: SingleFeature, index: number) => {
          if (singleFeature.featureType === featureType) {
            return (
              <FeatureItem
                key={singleFeature.id}
                feature={singleFeature}
                featureTypes={featureTypes}
                features={features}
                index={index}
              />
            );
          }
          return null;
        }
      )}
    </div>
  );
};

export default FeatureList;
