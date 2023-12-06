import { ACTION_TYPES } from "./actionTypes";
import { AddFeatAction, EmptyTypeStoreAction } from "./types";

export const addFeat = (
  text: string,
  description: string,
  featureType: string
): AddFeatAction => ({
  type: ACTION_TYPES.ADD_FEAT,
  payload: {
    id: Number(Math.round(Math.random() * 10000)).toString(),
    text,
    description,
    featureType,
  },
});

export const deleteFeat = (id: string, featureType: string) => ({
  type: ACTION_TYPES.DELETE_FEAT,
  payload: { id, featureType },
});

export const emptyTypeStore = (featureType: string): EmptyTypeStoreAction => {
  return {
    type: ACTION_TYPES.EMPTY_TYPE_STORE,
    payload: featureType,
  };
};
