import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Medicine } from "../interfaces/medicine";
import { useEffect, useState } from "react";
import { PaginationData } from "../interfaces/common";

interface Props {
  medicines: Medicine[];
  searchFor: string;
  hasPagination?: boolean;
  pagination?: PaginationData;
  onNext?: () => void;
  onPrev?: () => void;
}

const headers = [
  "Brand",
  "Company",
  "Dosage form",
  "Formula",
  "Price",
  "Milligrams",
  "Pack Size",
  "Reg No.",
  // "Actions",
];

const MedicinesTable = ({
  medicines,
  searchFor,
  hasPagination = false,
  pagination,
  onNext,
  onPrev,
}: Props) => {
  const [list, setList] = useState(medicines);
  const [sortOrder, setSortOrder] = useState("ascending");

  const onSort = () => {
    let sortedList = [];

    if (sortOrder === "ascending") {
      sortedList = list
        .slice()
        .sort((a, b) => Number(a.mrp || 0) - Number(b.mrp || 0));
      setSortOrder("descending");
    } else {
      sortedList = list
        .slice()
        .sort((a, b) => Number(b.mrp || 0) - Number(a.mrp || 0));
      setSortOrder("ascending");
    }

    setList([...sortedList]);
  };

  useEffect(() => {
    setList(medicines); // should be removed
  }, [medicines]);

  return (
    <Box>
      <TableContainer
        fontSize={"sm"}
        marginTop={2}
        style={{ maxHeight: "calc(100vh - 150px)", minHeight: "auto" }}
        overflowY={"auto"}
      >
        {searchFor && (
          <Box display={"flex"} justifyContent={"space-between"}>
            <Heading marginY={3} fontSize={"xl"} as={"h2"}>
              {"Search result for: " + searchFor}
            </Heading>
          </Box>
        )}
        <Table variant="striped" className="sticky-header">
          <Thead>
            <Tr>
              {headers.map((header) => (
                <Th key={header}>
                  {header === "Price" ? (
                    <>
                      {header}
                      <button onClick={onSort}>
                        {sortOrder === "ascending" ? "▲" : "▼"}
                      </button>
                    </>
                  ) : (
                    header
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {list.map((medicine) => {
              return (
                <Tr key={medicine.id}>
                  <Td>{medicine.brand_name}</Td>
                  <Td>{medicine.company_name}</Td>
                  <Td>{medicine.dosage_form}</Td>
                  <Td>{medicine.formula}</Td>
                  <Td>{medicine.mrp}</Td>
                  <Td>{medicine.milligrams}</Td>
                  <Td>{medicine.pack_size}</Td>
                  <Td>{medicine.reg_no}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {hasPagination && (
        <Flex justifyContent="center" marginTop={2} gap={4}>
          {pagination!.currentPage > 1 && (
            <Button onClick={onPrev}>Previous</Button>
          )}
          {pagination!.hasMore && <Button onClick={onNext}>Next</Button>}
        </Flex>
      )}
    </Box>
  );
};

export default MedicinesTable;
