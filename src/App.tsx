import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { emptyTypeStore } from "./Store/FeatureSlice/actions/actionCreators";
import GoogleIcon from "./assets/icons/Icon";
import { AppDispatch } from "./Store/store";
import "./App.scss";
import FeatureForm from "./components/FeatureForm/FeatureForm";
import FeatureList from "./components/FeatureList/FeatureList";

function App() {
  const featureTypes = ["Pros", "Cons"];

  const dispatch: AppDispatch = useDispatch();

  const emptyTypeStoreHandler = useCallback(
    (featureType: string) => {
      dispatch(emptyTypeStore(featureType));
    },
    [dispatch]
  );

  return (
    <div className="App">
      <h1>Is LinkedIn helpful for finding a job?</h1>
      <div className="columns">
        {featureTypes.map((featureType) => (
          <div className="side" key={featureType}>
            <div className="form-header">
              <h2>Input here the {featureType}</h2>
              <button
                onClick={() => emptyTypeStoreHandler(featureType)}
                className="empty-btn"
              >
                <GoogleIcon fill="white" width="16px" height="15px" />
                <span> Empty {featureType}</span>
              </button>
            </div>
            <FeatureForm featureType={featureType} />
            <FeatureList featureType={featureType} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
