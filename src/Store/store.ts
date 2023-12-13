import { applyMiddleware, combineReducers, createStore, compose } from "redux";

import featReducer from "./FeatureSlice/reducers/featReducer";
import { Dispatch } from "redux";
import { FeatAction } from "./FeatureSlice/actions/types";
import thunk from "redux-thunk";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  featuresSlice: featReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type AppDispatch = Dispatch<FeatAction>;
export { store as default };
