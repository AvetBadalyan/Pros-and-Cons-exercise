import { ACTION_TYPES } from "../actions/actionTypes";
import { FeatAction, FeaturesState } from "../actions/types";

const storedFeatures = localStorage.getItem("storedFeatures");

const initialState: FeaturesState = storedFeatures
  ? JSON.parse(storedFeatures)
  : {
      PROS: [],
      CONS: [],
    };

const featReducer = (
  state = initialState,
  action: FeatAction
): FeaturesState => {
  switch (action.type) {
    case ACTION_TYPES.ADD_FEAT:
      return {
        ...state,
        [action.payload.featureType]: [
          ...state[action.payload.featureType],
          action.payload,
        ],
      };

    case ACTION_TYPES.DELETE_FEAT:
      return {
        ...state,
        [action.payload.featureType]: state[action.payload.featureType].filter(
          (feat) => feat.id !== action.payload.id
        ),
      };

    case ACTION_TYPES.EMPTY_TYPE_STORE:
      return {
        ...state,
        [action.payload]: [],
      };

    case ACTION_TYPES.UPDATE_FEAT:
      const featureToUpdate = state[action.payload.featureType].find(
        (feat) => feat.id === action.payload.id
      );

      if (featureToUpdate) {
        // If found, update the feature's text and description
        featureToUpdate.text = action.payload.text;
        featureToUpdate.description = action.payload.description;
      }

      return {
        ...state,
        [action.payload.featureType]: [...state[action.payload.featureType]],
      };

    default:
      return state;
  }
};

export default featReducer;
