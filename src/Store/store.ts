import { applyMiddleware, combineReducers, createStore } from "redux";
import featReducer from "./FeatureSlice/reducers/featReducer";
import { Dispatch } from "redux";
import { FeatAction } from "./FeatureSlice/actions/types";
import thunk from "redux-thunk";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  featuresSlice: featReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = Dispatch<FeatAction>;
export { store as default };
