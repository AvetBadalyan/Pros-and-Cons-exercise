import React from "react";
import { Link, useParams } from "react-router-dom";
import "./SingleFeaturePage.scss";
import { FeaturesState } from "../../Store/FeatureSlice/actions/types";

interface SingleFeaturePageProps {
  features: FeaturesState;
}

const SingleFeaturePage: React.FC<SingleFeaturePageProps> = ({ features }) => {
  const { featureType, featureId } = useParams<{
    featureType: string;
    featureId: string;
  }>();

  const selectedFeature =
    featureType &&
    features[featureType] &&
    features[featureType]?.find((feature) => feature.id === featureId);

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

      <Link to="/">
        <button className="back-to-home-btn">Go back to home Page</button>
      </Link>
    </div>
  );
};

export default SingleFeaturePage;
