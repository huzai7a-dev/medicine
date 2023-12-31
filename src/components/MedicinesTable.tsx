import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
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
  "Reg No.",
  "Brand",
  "Company",
  "Dosage form",
  "Formula",
  "Price",
  "Milligrams",
  "Pack Size",
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
  const [sortFormula, setSorFormula] = useState(false);
  const [selectedMilligramFilter, setSelectedMilligramFilter] =
    useState("none");

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

  const sortByAlphabets = (a: Medicine, b: Medicine, sortFormula: boolean) => {
    if (!sortFormula) return 0;
    if (a?.formula && b?.formula) {
      if (a?.formula < b?.formula) {
        return -1;
      }
      if (a?.formula > b?.formula) {
        return 1;
      }
    }
    return 0;
  };

  const RenderHeader = ({ header }: { header: string }) => {
    if (header === "Price") {
      return (
        <>
          {header}
          <button onClick={onSort}>
            {sortOrder === "ascending" ? "▲" : "▼"}
          </button>
        </>
      );
    }
    if (header === "Formula") {
      return (
        <>
          {header}
          <button onClick={() => setSorFormula(!sortFormula)}>
            {sortFormula ? "▲" : "▼"}
          </button>
        </>
      );
    } else {
      return header;
    }
  };

  return (
    <Box>
      <TableContainer
        fontSize={"sm"}
        marginTop={2}
        style={{ maxHeight: "calc(100vh - 150px)", minHeight: "auto" }}
        overflowY={"auto"}
      >
        <Flex my={4} alignItems={"center"} justifyContent={"flex-end"}>
          <p>Milligrams</p>
          <Select
            ml={2}
            width="auto"
            onChange={(e) => setSelectedMilligramFilter(e.target.value)}
            value={selectedMilligramFilter}
          >
            <option value="none">None</option>
            <option value="500mg">500mg</option>
            <option value="400mg">400mg</option>
            <option value="250mg">250mg</option>
          </Select>
        </Flex>
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
                  <RenderHeader header={header} />
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {list
              .sort((a, b) => sortByAlphabets(a, b, sortFormula))
              .filter((medicine) => {
                if (selectedMilligramFilter === "none") {
                  return true;
                } else {
                  return medicine.milligrams === selectedMilligramFilter;
                }
              })
              .map((medicine) => {
                return (
                  <Tr key={medicine.id}>
                    <Td>{medicine.reg_no}</Td>
                    <Td>{medicine.brand_name}</Td>
                    <Td>{medicine.company_name}</Td>
                    <Td>{medicine.dosage_form}</Td>
                    <Td>{medicine.formula}</Td>
                    <Td>{medicine.mrp}</Td>
                    <Td>{medicine.milligrams}</Td>
                    <Td>{medicine.pack_size}</Td>
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
