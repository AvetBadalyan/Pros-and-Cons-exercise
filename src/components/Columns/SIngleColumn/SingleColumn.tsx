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

interface SingleColumnProps {
  featureType: string;
}

const SingleColumn: React.FC<SingleColumnProps> = ({ featureType }) => {
  const dispatch: AppDispatch = useDispatch();
  const feats = useSelector((state: RootState) => state.featuresSlice);
  const { isOpen, openModal, closeModal, ModalController } = useModal();

  const handleSaveFeature = (text: string, description: string) => {
    dispatch(addFeat(text, description, featureType));
    closeModal();
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
        {ModalController && (
          <ModalController
            onSave={handleSaveFeature}
            featureType={featureType}
            isOpen={isOpen}
            onClose={closeModal}
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

      <FeatureList featureType={featureType} />
    </div>
  );
};

export default SingleColumn;
