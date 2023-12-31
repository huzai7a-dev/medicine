import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CardBody,
  HStack,
  IconButton,
  Input,
  Select,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { searchPrescription } from "../services";
import { useNavigate } from "react-router-dom";
import { useMedicineGroups } from "../store/medicine";
import { useLoader } from "../store/app";

interface InputField {
  id: number;
  value: string;
  dosageForm: string;
}

function isArrayNonEmpty(arr: InputField[]) {
  return arr.every(
    (element) =>
      element.value !== "" &&
      element.value !== null &&
      element.value !== undefined &&
      element.dosageForm !== "" &&
      element.dosageForm !== null &&
      element.dosageForm !== undefined &&
      element.dosageForm !== "none"
  );
}

const InputPrescription = () => {
  const [inputs, setInputs] = useState<InputField[]>([
    { id: 1, value: "", dosageForm: "none" },
  ]);
  const loadGroups = useMedicineGroups((state) => state.loadGroups);
  const setLoading = useLoader((store) => store.setLoading);
  const inputsEmpty = useMemo(() => !isArrayNonEmpty(inputs), [inputs]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setLoading(true);
      navigate("/search-prescription");
      const data = await searchPrescription(getInputValues());
      loadGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (id: number, newValue: string) => {
    setInputs((inputs) =>
      inputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  const addInput = () => {
    const newId = inputs.length > 0 ? inputs[inputs.length - 1].id + 1 : 1;
    setInputs([...inputs, { id: newId, value: "", dosageForm: "" }]);
  };

  const removeInput = (id: number) => {
    setInputs((inputs) => inputs.filter((input) => input.id !== id));
  };

  const getInputValues = (): { brandName: string; dosageForm: string }[] => {
    return inputs.map((input) => ({
      brandName: input.value,
      dosageForm: input.dosageForm,
    }));
  };

  const handleDosageForm = (value: string, id: number) => {
    setInputs((inputs) =>
      inputs.map((input) =>
        input.id === id ? { ...input, dosageForm: value } : input
      )
    );
  };

  return (
    <Box position={"relative"}>
      <CardBody py={3}>
        {inputs.map(({ id, value, dosageForm }) => (
          <HStack key={id}>
            <Input
              flex={0.6}
              marginY={2}
              value={value}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            <Select
              flex={0.4}
              value={dosageForm}
              onChange={(e) => handleDosageForm(e.target.value, id)}
            >
              <option value="none">None</option>
              <option value="tablet">Tablets</option>
              <option value="capsule">Capsules</option>
            </Select>
            {id > 1 && (
              <IconButton
                colorScheme="red"
                aria-label="Remove input"
                icon={<DeleteIcon />}
                onClick={() => removeInput(id)}
              />
            )}
          </HStack>
        ))}
      </CardBody>
      <Box display={"flex"} gap={5} position={"sticky"} px={3} width={"full"}>
        <Button
          colorScheme="cyan"
          color={"white"}
          width={"full"}
          onClick={addInput}
        >
          Add
        </Button>
        <Button
          colorScheme="cyan"
          color={"white"}
          width={"full"}
          isDisabled={inputsEmpty}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default InputPrescription;
