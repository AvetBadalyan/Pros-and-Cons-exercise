import React from "react";
import { useParams } from "react-router-dom";

const SingleFeaturePage: React.FC = () => {
  const { featureType, featureId } = useParams<{
    featureType: string;
    featureId: string;
  }>();

  return (
    <div>
      <h1>Single Feature Page</h1>
      <p>Feature Type: {featureType}</p>
      <p>Feature ID: {featureId}</p>
    </div>
  );
};

export default SingleFeaturePage;
