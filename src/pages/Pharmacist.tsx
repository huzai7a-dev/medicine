import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllPharmacistMedicines } from "../services";
import PharmacistTable from "../components/PharmacistTable";
import Loader from "../components/Loader";
import { QueryType } from "../interfaces/common";

const Pharmacist = () => {
  const [page, setPage] = useState(1);
  const [showDeleted, setShowDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState<QueryType>({} as QueryType);
  const { data: medicines, isLoading } = useQuery({
    queryFn: () =>
      getAllPharmacistMedicines(page, 20, showDeleted, searchQuery),
    queryKey: ["medicine", page, showDeleted, searchQuery],
    placeholderData: keepPreviousData,
  });
  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  const searchMedicines = (query: QueryType) => {
    setSearchQuery(query);
  };
  if (isLoading) return <Loader />;
  return (
    <PharmacistTable
      pagination={medicines.pagination}
      showDelete={showDeleted}
      medicines={medicines.data}
      onPrev={handlePrev}
      onNext={handleNext}
      setShowDelete={setShowDelete}
      searchMedicines={searchMedicines}
    />
  );
};

export default Pharmacist;
