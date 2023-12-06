import React from "react";
import { useParams } from "react-router-dom";
import "./SingleFeaturePage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

const SingleFeaturePage: React.FC = () => {
  const feats = useSelector((state: RootState) => state.featuresSlice);

  const { featureType, featureId } = useParams<{
    featureType: string;
    featureId: string;
  }>();

  const selectedFeature =
    featureType &&
    feats[featureType] &&
    feats[featureType]?.find((feature) => feature.id === featureId);

  return (
    <div className="single-feature-page">
      <h1>Single Feature Page</h1>
      <p>Feature Type: {featureType}</p>
      <p>Feature ID: {featureId}</p>
      <p>
        Description:{" "}
        {(selectedFeature && selectedFeature.description) ||
          "No description available"}
      </p>
    </div>
  );
};

export default SingleFeaturePage;
