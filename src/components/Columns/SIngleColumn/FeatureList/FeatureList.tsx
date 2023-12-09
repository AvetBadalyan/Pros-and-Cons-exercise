import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import FeatureItem from "./FeatureItem/FeatureItem";
import { SingleFeature } from "../../../../Store/FeatureSlice/actions/types";

const FeatureList = ({
  featureType,
  featureTypes,
}: {
  featureType: string;
  featureTypes: string[];
}) => {
  const feats = useSelector((state: RootState) => state.featuresSlice);

  useEffect(() => {
    const sendToLocalStorage = () => {
      try {
        localStorage.setItem("storedFeatures", JSON.stringify(feats));
      } catch (error) {
        console.error("Failed to store data in localStorage:", error);
      }
    };
    window.addEventListener("beforeunload", sendToLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", sendToLocalStorage);
    };
  }, [feats]);

  return (
    <div className="feature-list">
      {feats[featureType].map((singleFeature: SingleFeature) => {
        if (singleFeature.featureType === featureType) {
          return (
            <FeatureItem
              key={singleFeature.id}
              feature={singleFeature}
              featureTypes={featureTypes}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default FeatureList;
