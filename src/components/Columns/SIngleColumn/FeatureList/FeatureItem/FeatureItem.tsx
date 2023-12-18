import { useDispatch } from "react-redux";
import { memo, useCallback } from "react";
import {
  deleteFeat,
  updateFeat,
} from "../../../../../Store/FeatureSlice/actions/actionCreators";
import { AppDispatch } from "../../../../../Store/store";
import {
  DeleteFeatAction,
  FeaturesState,
  SingleFeature,
} from "../../../../../Store/FeatureSlice/actions/types";
import { Link } from "react-router-dom";
import { useModal } from "../../../../../Helpers/useModalHook";
import "./FeatureItem.scss";
import { toast } from "react-toastify";
import EditIcon from "../../../../../assets/icons/edit-icon";

interface FeatureItemProps {
  feature: SingleFeature;
  featureTypes: string[];
  features: FeaturesState;
  index: number;
}

const FeatureItem: React.FC<FeatureItemProps> = memo(
  ({ feature, featureTypes, features, index }) => {
    const dispatch: AppDispatch = useDispatch();
    const { id, featureType, text, description } = feature;
    const { isOpen, openModal, closeModal, ModalController } = useModal();

    const handleDelete = useCallback(() => {
      dispatch(deleteFeat(id, featureType) as DeleteFeatAction);
    }, [dispatch, id, featureType]);

    const handleUpdateFeature = (
      editedText: string,
      editedDescription: string
    ) => {
      dispatch(updateFeat(id, featureType, editedText, editedDescription));
      toast.success("Successfully saved!");
    };

    return (
      <div className="feature-item">
        <Link to={`/features/${featureType}/${id}`}>
          <span className="feature-item-text">
            N {index + 1}: {text}
          </span>
        </Link>
        <button className="edit-btn" onClick={openModal}>
          <EditIcon fill="white" width="16px" height="15px" />
          <span> Edit</span>
        </button>
        {isOpen && ModalController && (
          <ModalController
            onSave={handleUpdateFeature}
            featureType={featureType}
            isEditing={true}
            initialText={text}
            initialDescription={description}
            isOpen={isOpen}
            onClose={closeModal}
            featureId={id}
            featureTypes={featureTypes}
            features={features}
          />
        )}

        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    );
  }
);

export default FeatureItem;
