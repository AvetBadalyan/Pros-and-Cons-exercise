import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeat } from "../../Store/FeatureSlice/actions/actionCreators";
import {
  AddFeatAction,
  SingleFeature,
} from "../../Store/FeatureSlice/actions/types";
import { AppDispatch, RootState } from "../../Store/store";
import "./featureForm.scss";

const FeatureForm = ({ featureType }: { featureType: string }) => {
  const [featureText, setFeatureText] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const feats = useSelector((state: RootState) => state.featuresSlice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feats.some((feature: SingleFeature) => feature.text === featureText)) {
      alert("Feature already exists!");
      return;
    }

    if (featureText.trim() !== "") {
      dispatch(addFeat(featureText, featureType) as AddFeatAction);
      setFeatureText("");
    } else {
      alert("Empty text cannot be added");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feature-form">
      <input
        type="text"
        placeholder="Enter a feature..."
        value={featureText}
        onChange={(e) => setFeatureText(e.target.value)}
      />
      <button type="submit">Add Feature</button>
    </form>
  );
};

export default FeatureForm;
