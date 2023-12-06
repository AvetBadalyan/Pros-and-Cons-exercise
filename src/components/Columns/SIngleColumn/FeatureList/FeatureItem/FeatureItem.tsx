import { useDispatch } from "react-redux";
import { memo, useCallback } from "react";
import { deleteFeat } from "../../../../../Store/FeatureSlice/actions/actionCreators";
import { AppDispatch } from "../../../../../Store/store";
import {
  DeleteFeatAction,
  SingleFeature,
} from "../../../../../Store/FeatureSlice/actions/types";
import { Link } from "react-router-dom";
import "./FeatureItem.scss";

const FeatureItem: React.FC<{ feature: SingleFeature }> = memo(
  ({ feature }) => {
    const dispatch: AppDispatch = useDispatch();
    const { id, featureType, text } = feature;

    const handleDelete = useCallback(() => {
      dispatch(deleteFeat(id, featureType) as DeleteFeatAction);
    }, [dispatch, id, featureType]);



    return (
      <div className="feature-item">
        <Link
          to={`/features/${featureType}/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="feature-item-text">{text}</p>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }
);

export default FeatureItem;
