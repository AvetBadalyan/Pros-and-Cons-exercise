import { useMemo, useState } from "react";
import {
  FeaturesState,
  SingleFeature,
} from "../../../../Store/FeatureSlice/actions/types";
import Paginate from "./Pagination/Paginate";
import FeatureItem from "./FeatureItem/FeatureItem";
import "./FeatureList.scss";

const FeaturesPerPage = 12;

interface FeatureListProps {
  featureType: string;
  featureTypes: string[];
  features: FeaturesState;
}

const FeatureList: React.FC<FeatureListProps> = ({
  featureType,
  featureTypes,
  features,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredFeatures = useMemo(
    () =>
      features[featureType].filter(
        (singleFeature: SingleFeature) =>
          singleFeature.featureType === featureType
      ),
    [features, featureType]
  );

  const indexOfLastFeature = currentPage * FeaturesPerPage;
  const indexOfFirstFeature = indexOfLastFeature - FeaturesPerPage;
  const currentFeatures = filteredFeatures.slice(
    indexOfFirstFeature,
    indexOfLastFeature
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage !== Math.ceil(filteredFeatures.length / FeaturesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginateIndex = (index: number) => {
    return index + (currentPage - 1) * FeaturesPerPage;
  };
  const showPagination = filteredFeatures.length > FeaturesPerPage;

  return (
    <>
      <div className="feature-list">
        {currentFeatures.map((singleFeature: SingleFeature, index: number) => (
          <FeatureItem
            key={singleFeature.id}
            feature={singleFeature}
            featureTypes={featureTypes}
            features={features}
            index={paginateIndex(index)}
          />
        ))}
      </div>
      {showPagination && (
        <Paginate
          featuresPerPage={FeaturesPerPage}
          totalFeatures={filteredFeatures.length}
          paginate={paginate}
          previousPage={goToPreviousPage}
          nextPage={goToNextPage}
        />
      )}
    </>
  );
};

export default FeatureList;
