/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  Middleware,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunk from "redux-thunk";
import featReducer from "./FeatureSlice/reducers/featReducer";
import { FeatAction } from "./FeatureSlice/actions/types";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  featuresSlice: featReducer,
});

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  try {
    const result = next(action);
    localStorage.setItem(
      "storedFeatures",
      JSON.stringify((store.getState() as RootState).featuresSlice)
    );
    return result;
  } catch (error) {
    console.error("Error handling localStorage:", error);
  }
};

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, localStorageMiddleware))
);

export type AppDispatch = Dispatch<FeatAction>;
export { store as default };
