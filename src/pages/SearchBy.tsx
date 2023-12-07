import MedicinesTable from "../components/MedicinesTable";
import { useLoader, useMedicineStore } from "../store";
import Loader from "../components/Loader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllMedicines } from "../services";
import { useState } from "react";

const SearchBy = () => {
  const isLoading = useLoader((store) => store.isLoading);
  const [page, setPage] = useState(1);
  const { searchFor, medicines } = useMedicineStore((store) => store);
  const { data: allMedicines, isLoading: isAllMedicineLoading } = useQuery({
    queryFn: () => getAllMedicines(page),
    queryKey: ["medicine", page],
    placeholderData: keepPreviousData,
  });
  console.log("first");
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  console.log(allMedicines?.data, "allMedicines.data");

  if (isLoading || isAllMedicineLoading) return <Loader />;

  const hasNoSearchResult = medicines.length < 1; // if user has not searched any thing this will be true then all the medicines will be show

  return (
    <MedicinesTable
      medicines={hasNoSearchResult ? allMedicines?.data || [] : medicines}
      searchFor={searchFor}
      hasPagination={hasNoSearchResult}
      pagination={allMedicines?.pagination}
      onNext={handleNextPage}
      onPrev={handlePrev}
    />
  );
};

export default SearchBy;
