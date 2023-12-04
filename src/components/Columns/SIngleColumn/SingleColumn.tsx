import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import FeatureModal from "../../Modals/FeatureModal/FeatureModal";
import GoogleIcon from "../../../assets/icons/Icon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Store/store";
import {
  addFeat,
  emptyTypeStore,
} from "../../../Store/FeatureSlice/actions/actionCreators";
import FeatureList from "./FeatureList/FeatureList";
// ... (imports remain unchanged)

interface SingleColumnProps {
  featureType: string;
}

const SingleColumn: React.FC<SingleColumnProps> = ({ featureType }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveFeature = (text: string, description: string) => {
    dispatch(addFeat(text, description, featureType));
  };

  const emptyTypeStoreHandler = useCallback(
    (featureType: string) => {
      dispatch(emptyTypeStore(featureType));
    },
    [dispatch]
  );

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  return (
    <div className="side" key={featureType}>
      <div className="form-header">
        <h2>Input here the {featureType}</h2>
        <button
          onClick={() => emptyTypeStoreHandler(featureType)}
          className="empty-btn"
        >
          <GoogleIcon fill="white" width="16px" height="15px" />
          <span> Empty {featureType}</span>
        </button>
      </div>
      <div>
        <button onClick={handleOpenModal}>Add Feature</button>
        {createPortal(
          <FeatureModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveFeature}
          />,
          modalRoot
        )}
      </div>
      <FeatureList featureType={featureType} />
    </div>
  );
};

export default SingleColumn;
