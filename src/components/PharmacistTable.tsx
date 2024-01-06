import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { deleteMedicine } from "../services";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { PaginationData, QueryType } from "../interfaces/common";
import { Medicine } from "../interfaces/medicine";
import UpdateMedicine from "./UpdateMedicine";
import { useNavigate } from "react-router-dom";

interface Props {
  medicines: Medicine[];
  searchFor?: string;
  showDelete: boolean;
  isFetched: boolean;
  pagination?: PaginationData;
  milligramsList: string[];
  setShowDelete: (state: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
  searchMedicines: (query: QueryType) => void;
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
  "Actions",
];

const PharmacistTable = ({
  medicines,
  searchFor,
  showDelete,
  pagination,
  isFetched,
  milligramsList,
  setShowDelete,
  onNext,
  onPrev,
  searchMedicines,
}: Props) => {
  const [list, setList] = useState(medicines);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState("ascending");
  const [selectedMilligramFilter, setSelectedMilligramFilter] =
    useState("none");

  const [searchQuery, setSearchQuery] = useState<QueryType>({
    searchBy: "",
    value: "",
    dosageForm: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const disableSearch =
    !searchQuery.searchBy || !searchQuery.value || !searchQuery.dosageForm;
  const handleSearchBy = (searchBy: string) => {
    setSearchQuery({
      ...searchQuery,
      searchBy,
    });
  };

  const handleValue = (value: string) => {
    setSearchQuery({
      ...searchQuery,
      value,
    });
  };
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

  const { mutate: deleteMed } = useMutation({
    mutationKey: ["deleteMedicine"],
    mutationFn: deleteMedicine,
    onError: (error) => {
      toast({
        title: "delete Medicine",
        description:
          error.message || "An error occurred during deleting medicine.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "delete Medicine",
        description: "deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const handleDelete = (id: string | number) => {
    deleteMed(id);
    const updatedList = list.filter((medicine) => medicine.id !== id);
    setList(updatedList);
  };
  const handleEdit = (medicines: Medicine) => {
    setSelectedMedicine(medicines);
    setShowUpdate(true);
  };

  useEffect(() => {
    setList(medicines); // should be removed
  }, [medicines]);

  const handleDosageForm = (value: string) => {
    setSearchQuery({
      ...searchQuery,
      dosageForm: value,
    });
  };
  return (
    <>
      <Box p={4}>
        <Flex justifyContent={"space-between"}>
          <Flex width={"full"} alignItems="center">
            <Input
              onChange={(e) => handleValue(e.target.value)}
              flex={"0.8"}
              placeholder="Search..."
              mr={2}
            />
            <Select
              width="auto"
              onChange={(e) => handleSearchBy(e.target.value)}
            >
              <option value={""}>Search by</option>
              <option value="brand_name">Brand Name</option>
              <option value="formula">Formula</option>
              <option value="company_name">Company Name</option>
            </Select>
            <Select
              flex={0.2}
              marginLeft={2}
              value={searchQuery.dosageForm}
              onChange={(e) => handleDosageForm(e.target.value)}
            >
              <option value="none">None</option>
              <option value="tablet">Tablets</option>
              <option value="capsule">Capsules</option>
            </Select>
            <Button
              colorScheme={disableSearch ? "blackAlpha" : "cyan"}
              color={"white"}
              isDisabled={disableSearch}
              onClick={() => searchMedicines(searchQuery)}
              ml={2}
            >
              Search
            </Button>
            {isFetched && !pagination && (
              <Button marginLeft={2} onClick={() => navigate(0)}>
                Clear
              </Button>
            )}
          </Flex>
          <Box
            width={"full"}
            display={"flex"}
            justifyContent={"flex-end"}
            p={4}
          >
            <Flex
              width={"full"}
              alignItems="center"
              justifyContent={"flex-end"}
              gap={10}
            >
              <Flex alignItems={"center"}>
                <p>Milligrams</p>
                <Select
                  ml={2}
                  width="auto"
                  onChange={(e) => setSelectedMilligramFilter(e.target.value)}
                  value={selectedMilligramFilter}
                >
                  <option value="none">None</option>
                  {milligramsList.sort().map((milligram) => (
                    <option>{milligram}</option>
                  ))}
                </Select>
              </Flex>
              <Flex>
                <FormLabel htmlFor="isChecked">Show Deleted</FormLabel>
                <Switch
                  id="isChecked"
                  onChange={() => setShowDelete(!showDelete)}
                  isChecked={showDelete}
                />
              </Flex>
            </Flex>
          </Box>
        </Flex>

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
          {!list || list.length === 0 ? (
            <Text mt={"3"} textAlign="center" fontSize={"3xl"}>
              No Medicine Found!
            </Text>
          ) : (
            <Table variant="striped" className="sticky-header">
              <Thead>
                <Tr fontSize={"small"}>
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
                {list
                  .filter((medicine) => {
                    if (selectedMilligramFilter === "none") {
                      return true;
                    } else {
                      return (
                        medicine.milligrams?.split(" ").join("") ===
                        selectedMilligramFilter.split(" ").join("")
                      );
                    }
                  })
                  .map((medicine) => {
                    return (
                      <Tr fontSize={"small"} key={medicine.id}>
                        <Td>{medicine.reg_no}</Td>
                        <Td>{medicine.brand_name}</Td>
                        <Td>{medicine.company_name}</Td>
                        <Td>{medicine.formula}</Td>
                        <Td>{medicine.mrp}</Td>
                        <Td>{medicine.efficacy}</Td>
                        <Td>{medicine.pack_size}</Td>
                        <Td>{medicine.milligrams?.split(" ").join("")}</Td>
                        <Td>{medicine.dosage_form}</Td>
                        <Td>
                          <Box display={"flex"} gap={2}>
                            <IconButton
                              aria-label="Updated Medicine"
                              onClick={() => handleEdit(medicine)}
                              icon={<EditIcon />}
                            />
                            {medicine.is_public && (
                              <IconButton
                                aria-label="Delete Medicine"
                                icon={
                                  <DeleteIcon
                                    color={"red"}
                                    onClick={() => handleDelete(medicine.id)}
                                  />
                                }
                              />
                            )}
                          </Box>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          )}
        </TableContainer>
        {pagination && (
          <Flex justifyContent="center" marginTop={2} gap={4}>
            {pagination!.currentPage > 1 && (
              <Button onClick={onPrev}>Previous</Button>
            )}
            {pagination!.hasMore && <Button onClick={onNext}>Next</Button>}
          </Flex>
        )}
      </Box>
      {selectedMedicine && (
        <UpdateMedicine
          isOpen={showUpdate}
          onClose={() => setShowUpdate(false)}
          data={selectedMedicine}
        />
      )}
    </>
  );
};

export default PharmacistTable;
