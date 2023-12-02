import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { emptyStore } from "./Store/FeatureSlice/actions/actionCreators";
import GoogleIcon from "./assets/icons/Icon";
import { AppDispatch } from "./Store/store";
import FeatureForm from "./components/FeatureForm/featureForm";
import FeatureList from "./components/FeatureList/featureList";
import "./App.scss";

function App() {
  const featureTypes = ["Pros", "Cons"];

  const dispatch: AppDispatch = useDispatch();

  const emptyStoreHandler = useCallback(
    (featureType: string) => {
      dispatch(emptyStore(featureType));
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
                onClick={() => emptyStoreHandler(featureType)}
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
