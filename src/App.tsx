import { useCallback } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import FeatureForm from "./components/featureForm";
import FeatureList from "./components/featureList";
import { emptyStore } from "./Store/actions/actionCreators";
import GoogleIcon from "./components/Icon";
import { AppDispatch } from "./Store/store";

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
