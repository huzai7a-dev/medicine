import {
  Box,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { searchByCriteria } from "../services";
import { useMedicineStore } from "../store/medicine";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { useLoader } from "../store/app";

const searches = [
  {
    value: "brand_name",
    title: "Brand",
  },
  {
    value: "company_name",
    title: "Company",
  },
  {
    value: "formula",
    title: "Generics",
  },
];

const SearchBy = () => {
  const [findBy, setFindBy] = useState("");
  const [searchText, setSearchText] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const loadMedicines = useMedicineStore((store) => store.loadMedicines);
  const setLoading = useLoader((store) => store.setLoading);

  const navigate = useNavigate();

  const findMedicine = async () => {
    try {
      setLoading(true);
      navigate("/search-by");
      const response = await searchByCriteria(findBy, searchText, dosageForm);
      loadMedicines(response.data, response.search);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDosageForm = (value: string) => {
    if (value === "none") {
      setFindBy("");
      setSearchText("");
      navigate(0);
      return;
    }
    setDosageForm(value);
  };
  return (
    <Card height={140}>
      <CardHeader py={2}>
        <Text fontWeight={"bold"} fontSize={"md"}>
          Search MedSubSys
        </Text>
      </CardHeader>
      <CardBody py={0}>
        <Select
          value={findBy}
          onChange={(e) => {
            setDosageForm("");
            setSearchText("");
            setFindBy(e.target.value);
          }}
          placeholder="Search By"
        >
          {searches.map((search) => (
            <option key={search.value} value={search.value}>
              {search.title}
            </option>
          ))}
        </Select>

        <Box display={"flex"} gap={"2"} marginTop={"2"}>
          <Input
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            value={dosageForm}
            onChange={(e) => handleSelectDosageForm(e.target.value)}
          >
            <option value="none">None</option>
            <option value="capsule">Capsule</option>
            <option value="tablet">Tablet</option>
          </Select>
          <IconButton
            onClick={findMedicine}
            aria-label="Search"
            icon={<SearchIcon />}
          />
        </Box>
      </CardBody>
    </Card>
  );
};
export default SearchBy;
