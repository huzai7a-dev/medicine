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
import { useState } from "react";
import { searchByCriteria } from "../services";
import { useLoader, useMedicineStore } from "../store";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

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
    value: "formulation",
    title: "Generics",
  },
];

const SearchBy = () => {
  const [findBy, setFindBy] = useState("");
  const [searchText, setSearchText] = useState("");
  const loadMedicines = useMedicineStore((store) => store.loadMedicines);
  const setLoading = useLoader((store) => store.setLoading);

  const navigate = useNavigate();

  const findMedicine = async () => {
    try {
      setLoading(true);
      navigate("/search-by");
      const response = await searchByCriteria(findBy, searchText);
      loadMedicines(response.data, response.search);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          onChange={(e) => setFindBy(e.target.value)}
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
