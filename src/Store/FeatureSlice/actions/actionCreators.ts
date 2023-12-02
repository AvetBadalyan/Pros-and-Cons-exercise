import { ACTION_TYPES } from "./actionTypes";
import { EmptyStoreAction } from "./types";

export const addFeat = (text: string, featureType: string) => ({
  type: ACTION_TYPES.ADD_FEAT,
  payload: {
    id: Math.random().toString(),
    text,
    featureType,
  },
});

export const deleteFeat = (id: string) => {
  return {
    type: ACTION_TYPES.DELETE_FEAT,
    payload: {
      id,
    },
  };
};

export const emptyStore = (featureType: string): EmptyStoreAction => {
  return {
    type: ACTION_TYPES.EMPTY_STORE,
    payload: featureType,
  };
};
