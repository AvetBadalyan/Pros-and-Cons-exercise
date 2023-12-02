import { ACTION_TYPES } from "../actions/actionTypes";
import { FeatAction, FeaturesState } from "../actions/types";

const storedFeatures = localStorage.getItem("storedFeatures");

const initialState: FeaturesState = storedFeatures
  ? JSON.parse(storedFeatures)
  : { pros: [], cons: [] };

const featReducer = (
  state = initialState,
  action: FeatAction
): FeaturesState => {
  switch (action.type) {
    case ACTION_TYPES.ADD_FEAT:
      return state;

    case ACTION_TYPES.DELETE_FEAT:
      return state;

    case ACTION_TYPES.EMPTY_STORE:
      return state;

    default:
      return state;
  }
};

export default featReducer;
