// SingleFeaturePage.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import "./SingleFeaturePage.scss";
import { FeaturesState } from "../../Store/FeatureSlice/actions/types";
import { useDispatch } from "react-redux";
import { updateFeatures } from "../../Store/FeatureSlice/actions/actionCreators";

interface SingleFeaturePageProps {
  features: FeaturesState;
}

const SingleFeaturePage: React.FC<SingleFeaturePageProps> = ({ features }) => {
  const dispatch = useDispatch();
  const { featureType, featureId } = useParams<{
    featureType: string;
    featureId: string;
  }>();

  const selectedFeature =
    featureType &&
    features[featureType] &&
    features[featureType]?.find((feature) => feature.id === featureId);

  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "storedFeatures" && e.newValue) {
        const updatedFeatures = JSON.parse(e.newValue);
        dispatch(updateFeatures(updatedFeatures));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  return (
    <div className="single-feature-page">
      <h1>Single Feature Page</h1>
      <div className="single-page-content">
        <p>Feature Type: {featureType}</p>
        <p>Feature ID: {featureId}</p>
        <p>
          Description:{" "}
          {(selectedFeature && selectedFeature.description) ||
            "No description available"}
        </p>
      </div>

      <Link to="/">
        <button className="back-to-home-btn">Go back to home Page</button>
      </Link>
    </div>
  );
};

export default SingleFeaturePage;
