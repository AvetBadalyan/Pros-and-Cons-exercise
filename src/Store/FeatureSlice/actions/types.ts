import { ACTION_TYPES } from "./actionTypes";

export interface SingleFeature {
  id: string;
  text: string;
  featureType: string;
}

export type FeaturesState = SingleFeature[];

export interface AddFeatAction {
  type: ACTION_TYPES.ADD_FEAT;
  payload: SingleFeature;
}

export interface DeleteFeatAction {
  type: ACTION_TYPES.DELETE_FEAT;
  payload: { id: string };
}

export interface EmptyStoreAction {
  type: ACTION_TYPES.EMPTY_STORE;
  payload: string;
}

export type FeatAction = AddFeatAction | DeleteFeatAction | EmptyStoreAction;
