import { Card, CardBody, Text } from "@chakra-ui/react";
import { Group } from "../store/medicine";
import { COLOR_SCHEME } from "../constants/theme";
import { Link } from "react-router-dom";

const PrescriptionSuggestion = ({
  suggestedPrescription,
}: {
  suggestedPrescription: Group["suggestedResult"];
}) => {
  return (
    <Card marginTop={"4"}>
      <CardBody>
        <Text fontSize={22}>
          {suggestedPrescription?.brand} is available as{" "}
          <Link
            to={`/search-prescription?brand=${suggestedPrescription?.brand}&dosageForm=${suggestedPrescription?.dosageForm}`}
          >
            <Text
              _hover={{ borderBottom: "1px solid green" }}
              display={"inline"}
              color={`${COLOR_SCHEME}.500`}
            >
              {suggestedPrescription?.dosageForm}
            </Text>
          </Link>
        </Text>
      </CardBody>
    </Card>
  );
};

export default PrescriptionSuggestion;
