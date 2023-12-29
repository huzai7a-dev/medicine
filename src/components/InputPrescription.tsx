import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CardBody,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { searchPrescription } from "../services";
import { useNavigate } from "react-router-dom";
import { useMedicineGroups } from "../store/medicine";
import { useLoader } from "../store/app";

interface InputField {
  id: number;
  value: string;
}

const InputPrescription = () => {
  const [inputs, setInputs] = useState<InputField[]>([{ id: 1, value: "" }]);
  const loadGroups = useMedicineGroups((state) => state.loadGroups);
  const setLoading = useLoader((store) => store.setLoading);

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
    setInputs([...inputs, { id: newId, value: "" }]);
  };

  const removeInput = (id: number) => {
    setInputs((inputs) => inputs.filter((input) => input.id !== id));
  };

  const getInputValues = () => {
    return inputs.map((input) => input.value);
  };

  return (
    <Box position={"relative"}>
      <CardBody py={3}>
        {inputs.map(({ id, value }) => (
          <HStack key={id}>
            <Input
              marginY={2}
              value={value}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
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
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default InputPrescription;
