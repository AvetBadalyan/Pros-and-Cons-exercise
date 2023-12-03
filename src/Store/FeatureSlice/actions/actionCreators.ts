import { ACTION_TYPES } from "./actionTypes";
import { EmptyTypeStoreAction } from "./types";

export const addFeat = (text: string, featureType: string) => ({
  type: ACTION_TYPES.ADD_FEAT,
  payload: {
    id: Math.random().toString(),
    text,
    featureType,
  },
});

export const deleteFeat = (id: string, featureType: string) => ({
  type: ACTION_TYPES.DELETE_FEAT,
  payload: {
    id,
    featureType,
  },
});

export const emptyTypeStore = (featureType: string): EmptyTypeStoreAction => {
  return {
    type: ACTION_TYPES.EMPTY_TYPE_STORE,
    payload: featureType,
  };
};
