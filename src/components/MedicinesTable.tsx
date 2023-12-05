import {
  Box,
  Heading,
//   Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import { Medicine } from "../entities/medicine";
import { useState } from "react";

interface Props {
  medicines: Medicine[];
  searchFor: string;
}

const headers = [
  "Brand",
  "Company",
  "Dosage form",
  "Formulation",
  "Price",
  "Pack Size",
  "Reg No.",
  "Actions"
];

const MedicinesTable = ({ medicines, searchFor }: Props) => {
    const [list,setList] = useState(medicines);
    const [sortOrder, setSortOrder] = useState("ascending")

    const onSort = () => {
      let sortedList = [];
  
      if (sortOrder === 'ascending') {
          sortedList = list.slice().sort((a, b) => Number(a.mrp || 0) - Number(b.mrp || 0));
          setSortOrder('descending');
      } else {
          sortedList = list.slice().sort((a, b) => Number(b.mrp || 0) - Number(a.mrp || 0));
          setSortOrder('ascending');
      }
  
      setList([...sortedList]);
  };


  return (
    <TableContainer
      fontSize={"sm"}
      marginY={8}
      style={{ maxHeight: "calc(100vh - 150px)", minHeight: "auto" }}
      overflowY={"auto"}
    >
      {
      searchFor &&
      <Box display={"flex"} justifyContent={"space-between"}>
        <Heading marginY={3} fontSize={"xl"} as={"h2"}>
          { "Search result for: " + searchFor}
        </Heading>
      </Box>
      }
      <Table variant="striped" className="sticky-header">
        <Thead>
          <Tr>
          {headers.map(header => (
            <Th key={header}>
              {header === 'Price' ? (
                <>
                  {header}
                  <button onClick={onSort}>
                    {sortOrder === 'ascending' ? '▲' : '▼'}
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
                <Td>{medicine.formulation}</Td>
                <Td>{medicine.mrp}</Td>
                <Td>{medicine.pack_size}</Td>
                <Td>{medicine.reg_no}</Td>
                <Td><EditIcon/></Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MedicinesTable;
