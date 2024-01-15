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
import { useCallback, useEffect, useMemo, useState } from "react";
import { searchByCriteria } from "../services";
import { useMedicineStore } from "../store/medicine";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { useLoader } from "../store/app";
import { COLOR_SCHEME } from "../constants/theme";

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
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const findMedicine = useCallback(
    async (findBy: string, searchText: string, dosageForm: string) => {
      try {
        setLoading(true);
        navigate("/search-by");
        const response = await searchByCriteria(findBy, searchText, dosageForm);
        loadMedicines(
          response.data,
          response.search,
          response.milligramsList,
          response.suggest
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [loadMedicines, navigate, setLoading]
  );
  const handleSelectDosageForm = (value: string) => {
    if (value === "none") {
      setFindBy("");
      setSearchText("");
      navigate(0);
      return;
    }
    setDosageForm(value);
  };
  useEffect(() => {
    if (query.size > 0) {
      const findBy = query.get("findBy");
      const searchFor = query.get("searchFor");
      const dosageForm = query.get("dosageForm");
      if (findBy && searchFor && dosageForm) {
        findMedicine(findBy, searchFor, dosageForm);
      }
    }
  }, [findMedicine, query]);
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
            onClick={() => findMedicine(findBy, searchText, dosageForm)}
            aria-label="Search"
            colorScheme={COLOR_SCHEME}
            isDisabled={!findBy || !searchText || !dosageForm}
            icon={<SearchIcon />}
          />
        </Box>
      </CardBody>
    </Card>
  );
};
export default SearchBy;
