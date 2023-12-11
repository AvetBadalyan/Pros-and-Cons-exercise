import { useCallback } from "react";
import GoogleIcon from "../../../assets/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Store/store";
import {
  addFeat,
  emptyTypeStore,
} from "../../../Store/FeatureSlice/actions/actionCreators";
import FeatureList from "./FeatureList/FeatureList";
import { makeUpperCase } from "../../../Helpers/communFunctions";
import { useModal } from "../../../Helpers/useModalHook";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SingleColumnProps {
  featureType: string;
  featureTypes: string[];
}

const SingleColumn: React.FC<SingleColumnProps> = ({
  featureType,
  featureTypes,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const feats = useSelector((state: RootState) => state.featuresSlice);
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

  return (
    <div className="side" key={featureType}>
      <div className="form-header">
        <h2> {makeUpperCase(`Your ${featureType} here`)} </h2>
        <Button variant="outlined" onClick={handleOpenModal}>
          {makeUpperCase(`Add a new feature in ${featureType}`)}
        </Button>
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

        {isOpen && ModalController && (
          <ModalController
            onSave={handleSaveFeature}
            featureType={featureType}
            isOpen={isOpen}
            onClose={closeModal}
            featureTypes={featureTypes}
          />
        )}

        <button
          onClick={() => emptyTypeStoreHandler(featureType)}
          className="empty-btn"
          disabled={feats[featureType].length < 0}
        >
          <GoogleIcon fill="white" width="16px" height="15px" />
          <span> Empty {featureType}</span>
        </button>
      </div>

      <FeatureList featureType={featureType} featureTypes={featureTypes} />
    </div>
  );
};

export default SingleColumn;
