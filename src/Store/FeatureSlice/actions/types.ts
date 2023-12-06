import { ACTION_TYPES } from "./actionTypes";

export interface SingleFeature {
  id: string;
  text: string;
  description: string;
  featureType: string;
}

export interface FeaturesState {
  [key: string]: SingleFeature[];
}

export interface AddFeatAction {
  type: ACTION_TYPES.ADD_FEAT;
  payload: SingleFeature;
}

export interface DeleteFeatAction {
  type: ACTION_TYPES.DELETE_FEAT;
  payload: { id: string; featureType: string };
}

export interface EmptyTypeStoreAction {
  type: ACTION_TYPES.EMPTY_TYPE_STORE;
  payload: string;
}

export type FeatAction =
  | AddFeatAction
  | DeleteFeatAction
  | EmptyTypeStoreAction;
