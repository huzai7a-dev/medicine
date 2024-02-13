import { useEffect, useState } from "react";
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
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Medicine, MedicineSuggest } from "../interfaces/medicine";
import { PaginationData } from "../interfaces/common";
import { COLOR_SCHEME } from "../constants/theme";
import SearchBySuggest from "./SearchBySuggest";
import { Group } from "../store/medicine";
import PrescriptionSuggestion from "./PrescriptionSuggestion";

interface Props {
  tableType: "searchBy" | "prescription";
  medicines: Medicine[];
  searchFor: string;
  milligramsList?: string[];
  pagination?: PaginationData;
  suggest?: MedicineSuggest;
  suggestedPrescription?: Group["suggestedResult"];
  onNext?: () => void;
  onPrev?: () => void;
}

const headers = [
  "Reg No.",
  "Brand",
  "Company",
  "Formula",
  "Price",
  "Efficacy",
  "Pack Size",
  "Milligrams",
  "Dosage form",
];

const MedicinesTable = ({
  tableType,
  medicines,
  searchFor,
  pagination,
  milligramsList,
  suggest,
  suggestedPrescription,
  onNext,
  onPrev,
}: Props) => {
  const [list, setList] = useState(medicines);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortByMG,setSortByMG] = useState(false);
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
    setList(medicines);
  }, [medicines]);

  useEffect(() => {
    let sortedList = list;
    sortedList = list.sort((a, b) => {
      if (a.formula && b.formula) {
        if (sortFormula) {
          return a.formula.localeCompare(b.formula);
        } else {
          return b.formula.localeCompare(a.formula);
        }
      } else {
        return 0;
      }
    });
    setList(sortedList);
  }, [list, sortFormula]);

  useEffect(()=> {
    let sortedList = list;
    sortedList = list.sort((a,b)=> {
      const firstNum = Number(a?.efficacy?.split("%")[0]) || 0;
      const secondNum = Number(b.efficacy?.split("%")[0]) || 0;
      return sortByMG ? secondNum - firstNum : firstNum - secondNum
    });
    setList(sortedList);
  },[list, sortByMG]);

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
            {sortFormula ? "▼" : "▲"}
          </button>
        </>
      );
    }if(header === "Efficacy"){
      return (
        <>
          {header}
          <button onClick={()=> setSortByMG(!sortByMG)}>
          {sortByMG ? "▼" : "▲"}
          </button>
        </>
      )
    } 
    else {
      return header;
    }
  };

  if (tableType === "searchBy" && suggest && suggest?.hasSuggestedMedicine)
    return (
      <SearchBySuggest
        dosageForm={suggest.dosageForm}
        findBy={suggest.findBy}
        searchFor={searchFor}
      />
    );

  if (tableType === "prescription" && suggestedPrescription)
    return (
      <PrescriptionSuggestion suggestedPrescription={suggestedPrescription} />
    );

  return (
    <Box>
      <TableContainer
        fontSize={"sm"}
        marginTop={2}
        style={{ maxHeight: "calc(100vh - 150px)", minHeight: "auto" }}
        overflowY={"auto"}
      >
        {milligramsList && milligramsList?.length > 0 && (
          <Flex my={4} alignItems={"center"} justifyContent={"flex-end"}>
            <p>Milligrams</p>
            <Select
              ml={2}
              width="auto"
              onChange={(e) => setSelectedMilligramFilter(e.target.value)}
              value={selectedMilligramFilter}
            >
              <option value="none">None</option>
              {milligramsList?.sort()?.map((milligram) => (
                <option value={milligram}>{milligram}</option>
              ))}
            </Select>
          </Flex>
        )}
        {searchFor && (
          <Box display={"flex"} justifyContent={"space-between"}>
            <Heading marginY={3} fontSize={"xl"} as={"h2"}>
              {"Search result for: " + searchFor}
            </Heading>
          </Box>
        )}
        {!list || list.length === 0 ? (
          <Text textAlign={"center"} fontSize={"3xl"}>
            No Medicine Found!
          </Text>
        ) : (
          <Table
            colorScheme={COLOR_SCHEME}
            variant="striped"
            className="sticky-header"
          >
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
                .filter((medicine) => {
                  if (selectedMilligramFilter === "none") {
                    return true;
                  } else {
                    return (
                      medicine.milligrams
                        ?.split(" ")
                        ?.join("")
                        ?.replace(",", "") === selectedMilligramFilter
                    );
                  }
                })
                .map((medicine) => {
                  return (
                    <Tr key={medicine.id}>
                      <Td>{medicine.reg_no}</Td>
                      <Td>{medicine.brand_name}</Td>
                      <Td>{medicine.company_name}</Td>
                      <Td>{medicine.formula}</Td>
                      <Td>{medicine.mrp}</Td>
                      <Td>{medicine.efficacy}</Td>
                      <Td>{medicine.pack_size}</Td>
                      <Td>{medicine.milligrams}</Td>
                      <Td>{medicine.dosage_form}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        )}
      </TableContainer>

      {pagination && pagination!.currentPage && (
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
