import { useDispatch } from "react-redux";

import { memo, useCallback } from "react";
import { deleteFeat } from "../../../../../Store/FeatureSlice/actions/actionCreators";
import { AppDispatch } from "../../../../../Store/store";
import {
  DeleteFeatAction,
  SingleFeature,
} from "../../../../../Store/FeatureSlice/actions/types";

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
