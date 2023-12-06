import { useCallback } from "react";
import FeatureModal from "../../Modals/FeatureModal/FeatureModal";
import GoogleIcon from "../../../assets/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Store/store";
import {
  addFeat,
  emptyTypeStore,
} from "../../../Store/FeatureSlice/actions/actionCreators";
import FeatureList from "./FeatureList/FeatureList";
import { makeUpperCase } from "../../../Helpers/communFunctions";

interface SingleColumnProps {
  featureType: string;
}

const SingleColumn: React.FC<SingleColumnProps> = ({ featureType }) => {
  const dispatch: AppDispatch = useDispatch();
  const feats = useSelector((state: RootState) => state.featuresSlice);
  console.log(feats, "feats");

  const handleSaveFeature = (text: string, description: string) => {
    dispatch(addFeat(text, description, featureType));
  };

  const emptyTypeStoreHandler = useCallback(
    (featureType: string) => {
      dispatch(emptyTypeStore(featureType));
    },
    [dispatch]
  );

  return (
    <div className="side" key={featureType}>
      <div className="form-header">
        <h2> {makeUpperCase(`Your ${featureType} here`)} </h2>
        <FeatureModal onSave={handleSaveFeature} featureType={featureType} />
        <button
          onClick={() => emptyTypeStoreHandler(featureType)}
          className="empty-btn"
          disabled={feats[featureType].length < 0}
        >
          <GoogleIcon fill="white" width="16px" height="15px" />
          <span> Empty {featureType}</span>
        </button>
      </div>

      <FeatureList featureType={featureType} />
    </div>
  );
};

export default SingleColumn;
