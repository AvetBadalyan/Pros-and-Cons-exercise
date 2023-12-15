import { ACTION_TYPES } from "../actions/actionTypes";
import { FeatAction, FeaturesState } from "../actions/types";

const getStoredFeatures = (): FeaturesState => {
  const storedFeatures = localStorage.getItem("storedFeatures");
  return storedFeatures ? JSON.parse(storedFeatures) : { PROS: [], CONS: [] };
};

const initialState: FeaturesState = getStoredFeatures();

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

    case ACTION_TYPES.UPDATE_FEAT: {
      const { featureType, id, text, description } = action.payload;

      return {
        ...state,
        [featureType]: state[featureType].map((feature) => {
          if (feature.id === id) {
            return {
              ...feature,
              text,
              description,
            };
          }
          return feature;
        }),
      };
    }

    default:
      return state;
  }
};

export default featReducer;
