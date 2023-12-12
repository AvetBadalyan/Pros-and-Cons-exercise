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
import "./FeatureItem.scss";
import { useModal } from "../../../../../Helpers/useModalHook";

interface FeatureItemProps {
  feature: SingleFeature;
  featureTypes: string[];
  features: FeaturesState;
}

const FeatureItem: React.FC<FeatureItemProps> = memo(
  ({ feature, featureTypes, features }) => {
    const dispatch: AppDispatch = useDispatch();
    const { id, featureType, text, description } = feature;
    const { isOpen, openModal, closeModal, ModalController } = useModal();

    const handleDelete = useCallback(() => {
      dispatch(deleteFeat(id, featureType) as DeleteFeatAction);
    }, [dispatch, id, featureType]);

    const handleEdit = () => {
      openModal();
    };

    const handleUpdateFeature = (
      editedText: string,
      editedDescription: string
    ) => {
      dispatch(updateFeat(id, featureType, editedText, editedDescription));
      closeModal();
    };

    return (
      <div className="feature-item">
        <Link to={`/features/${featureType}/${id}`}>
          <p className="feature-item-text">{text}</p>
        </Link>
        <button onClick={handleEdit}>Edit</button>
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
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }
);

export default FeatureItem;
