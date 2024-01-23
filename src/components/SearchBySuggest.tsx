import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SearchBySuggest = ({
  dosageForm,
  findBy,
  searchFor,
}: {
  searchFor: string;
  dosageForm: string;
  findBy: string;
}) => {
  return (
    <Link
      style={{ textDecoration: "underline" }}
      to={`/search-by?searchFor=${searchFor}&dosageForm=${dosageForm}&findBy=${findBy}`}
    >
      <Text>
        {searchFor} is available as {dosageForm}
      </Text>
    </Link>
  );
};

export default SearchBySuggest;
