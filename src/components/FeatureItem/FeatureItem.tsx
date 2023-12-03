import { useDispatch } from "react-redux";
import { deleteFeat } from "../../Store/FeatureSlice/actions/actionCreators";
import "./../../App.scss";
import {
  DeleteFeatAction,
  SingleFeature,
} from "../../Store/FeatureSlice/actions/types";
import { memo, useCallback } from "react";
import { AppDispatch } from "../../Store/store";

const FeatureItem: React.FC<{ feature: SingleFeature }> = memo(
  ({ feature }) => {
    const dispatch: AppDispatch = useDispatch();

    const handleDelete = useCallback(() => {
      dispatch(deleteFeat(feature.id) as DeleteFeatAction);
    }, [dispatch, feature.id]);

    return (
      <div className="feature-item">
        <div>{feature.text}</div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }
);

export default FeatureItem;
