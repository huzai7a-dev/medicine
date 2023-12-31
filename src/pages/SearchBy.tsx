import MedicinesTable from "../components/MedicinesTable";
import { useMedicineStore } from "../store/medicine";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";
import { getAllMedicines } from "../services";
import { useEffect, useState } from "react";
import { useLoader } from "../store/app";

const SearchBy = () => {
  const isLoading = useLoader((store) => store.isLoading);
  const [hasSearchResult, setHasSearchResult] = useState(false);
  const [page, setPage] = useState(1);
  const { searchFor, medicines } = useMedicineStore((store) => store);
  const {
    data: allMedicines,
    isLoading: isAllMedicineLoading,
    isFetched: hasMedicineFetched,
  } = useQuery({
    queryFn: () => getAllMedicines(page),
    queryKey: ["medicine", page],
  });

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    const hasSearchResult = hasMedicineFetched && medicines.length > 0;
    setHasSearchResult(hasSearchResult); // if user has not searched any thing this will be true then all the medicines will be show
  }, [hasMedicineFetched, medicines.length]);

  if (isLoading || isAllMedicineLoading) return <Loader />;
  return (
    <MedicinesTable
      medicines={!hasSearchResult ? allMedicines?.data || [] : medicines}
      searchFor={searchFor}
      hasPagination={!hasSearchResult}
      pagination={allMedicines?.pagination}
      onNext={handleNextPage}
      onPrev={handlePrev}
    />
  );
};

export default SearchBy;
