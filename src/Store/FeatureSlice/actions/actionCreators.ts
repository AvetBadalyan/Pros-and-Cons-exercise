import { ACTION_TYPES } from "./actionTypes";
import {
  AddFeatAction,
  DeleteFeatAction,
  EmptyTypeStoreAction,
  FeaturesState,
  UpdateFeatAction,
} from "./types";
import { v4 as uuidv4 } from "uuid";

export const addFeat = (
  text: string,
  description: string,
  featureType: string
): AddFeatAction => ({
  type: ACTION_TYPES.ADD_FEAT,
  payload: {
    id: uuidv4(),
    text,
    description,
    featureType,
  },
});

export const deleteFeat = (
  id: string,
  featureType: string
): DeleteFeatAction => ({
  type: ACTION_TYPES.DELETE_FEAT,
  payload: { id, featureType },
});

export const emptyTypeStore = (featureType: string): EmptyTypeStoreAction => ({
  type: ACTION_TYPES.EMPTY_TYPE_STORE,
  payload: featureType,
});

export const updateFeat = (
  id: string,
  featureType: string,
  editedText: string,
  editedDescription: string
): UpdateFeatAction => ({
  type: ACTION_TYPES.UPDATE_FEAT,
  payload: {
    id,
    featureType,
    text: editedText,
    description: editedDescription,
  },
});

export const updateFeatures = (features: FeaturesState) => ({
  type: ACTION_TYPES.UPDATE_FEATURES,
  payload: features,
});
