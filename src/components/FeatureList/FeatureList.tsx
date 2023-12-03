import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { SingleFeature } from "../../Store/FeatureSlice/actions/types";
import FeatureItem from "../FeatureItem/FeatureItem";

const FeatureList = ({ featureType }: { featureType: string }) => {
  const feats = useSelector((state: RootState) => state.featuresSlice);
  console.log(feats, "feats");
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
      {feats.pros?.map((singleFeature: SingleFeature) => {
        if (singleFeature.featureType === featureType) {
          return <FeatureItem key={singleFeature.id} feature={singleFeature} />;
        }
        return null;
      })}
    </div>
  );
};

export default FeatureList;
