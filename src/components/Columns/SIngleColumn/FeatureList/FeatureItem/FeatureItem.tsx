import { useDispatch } from "react-redux";
import { memo, useCallback } from "react";
import {
  deleteFeat,
  updateFeat,
} from "../../../../../Store/FeatureSlice/actions/actionCreators";
import { AppDispatch } from "../../../../../Store/store";
import {
  DeleteFeatAction,
  SingleFeature,
} from "../../../../../Store/FeatureSlice/actions/types";
import { Link } from "react-router-dom";
import "./FeatureItem.scss";
import { useModal } from "../../../../../Helpers/useModalHook";

const FeatureItem: React.FC<{
  feature: SingleFeature;
  featureTypes: string[];
}> = memo(({ feature, featureTypes }) => {
  const dispatch: AppDispatch = useDispatch();
  const { id, featureType, text } = feature;
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
      <Link
        to={`/features/${featureType}/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="feature-item-text">{text}</p>
      </Link>
      <button onClick={handleEdit}>Edit</button>
      {ModalController && (
        <ModalController
          onSave={handleUpdateFeature}
          featureType={feature.featureType}
          isEditing={true}
          initialText={feature.text}
          initialDescription={feature.description}
          isOpen={isOpen}
          onClose={closeModal}
          featureId={id}
          featureTypes={featureTypes}
        />
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
});

export default FeatureItem;
