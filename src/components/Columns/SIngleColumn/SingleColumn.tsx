import { useCallback } from "react";
import EmptyIcon from "../../../assets/icons/remove-Icon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Store/store";
import {
  addFeat,
  emptyTypeStore,
} from "../../../Store/FeatureSlice/actions/actionCreators";
import FeatureList from "./FeatureList/FeatureList";
import { makeUpperCase } from "../../../Helpers/communFunctions";
import { useModal } from "../../../Helpers/useModalHook";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FeaturesState } from "../../../Store/FeatureSlice/actions/types";
import "./SingleColumn.scss";

interface SingleColumnProps {
  featureType: string;
  featureTypes: string[];
  features: FeaturesState;
}

const SingleColumn: React.FC<SingleColumnProps> = ({
  featureType,
  featureTypes,
  features,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, openModal, closeModal, ModalController } = useModal();

  const handleSaveFeature = (text: string, description: string) => {
    dispatch(addFeat(text, description, featureType));
    toast.success("Successfully saved!");
  };

  const handleOpenModal = () => {
    openModal();
  };

  const emptyTypeStoreHandler = useCallback(
    (featureType: string) => {
      dispatch(emptyTypeStore(featureType));
    },
    [dispatch]
  );

  console.log(features[featureType].length);

  return (
    <div className="side" key={featureType}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="form-header">
        <h2> {makeUpperCase(`Your ${featureType} here`)} </h2>
        <button className="add-new-modal-btn" onClick={handleOpenModal}>
          {makeUpperCase(`Add a new feature in ${featureType}`)}
        </button>

        {isOpen && ModalController && (
          <ModalController
            onSave={handleSaveFeature}
            featureType={featureType}
            isOpen={isOpen}
            onClose={closeModal}
            featureTypes={featureTypes}
            features={features}
          />
        )}

        <button
          onClick={() => emptyTypeStoreHandler(featureType)}
          className="empty-btn"
          disabled={features[featureType].length === 0}
        >
          <EmptyIcon fill="white" width="16px" height="16px" />
          <span> {makeUpperCase(`Empty ${featureType}`)}</span>
        </button>
      </div>

      <FeatureList
        featureType={featureType}
        featureTypes={featureTypes}
        features={features}
      />
    </div>
  );
};

export default SingleColumn;
