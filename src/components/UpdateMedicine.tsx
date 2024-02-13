import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Medicine } from "../interfaces/medicine";
import { updateMed } from "../services";
import { capitalizeFirstLetter } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { COLOR_SCHEME } from "../constants/theme";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Medicine;
}

const orderedProperties = [
  "brand_name",
  "company_name",
  "dosage_form",
  "formula",
  "formulation",
  "is_public",
  "pack_size",
  "reg_no",
  "efficacy",
  "remarks",
  "milligrams",
  "mrp",
];

const UpdateMedicine = ({ isOpen, onClose, data }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Medicine>(data);

  const handleInputChange = (
    key: keyof Medicine,
    value: string | number | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(()=> {
    setFormData(data);
  },[data])
  const { mutate: update } = useMutation({
    mutationKey: ["update"],
    mutationFn: updateMed,
    onSuccess: () => {
      toast({
        title: "Update",
        description: " medicine updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      navigate(0);
    },
    onError: (error) => {
      toast({
        title: "Update Error",
        description: error.message || "Failed to update medicine",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const editableInputs = ["remarks", "milligrams", "mrp", "efficacy"];
  const handleUpdate = async () => {
    update(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"large"}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <FormControl p={5}>
            <Box display={"flex"} flexDir={"column"} gap={5}>
              {orderedProperties.map((key) => (
                <Box key={key}>
                  <FormLabel>
                    {capitalizeFirstLetter(key.replace(/_/g, " "))}
                  </FormLabel>
                  {
                    key === "is_public" ? (
                      <Select onChange={(e)=> handleInputChange('is_public', e.target.value === "true" ? true : false)} value={formData.is_public ? "true" : "false"} placeholder='Select option'>
                        <option value='false'>False</option>
                        <option value='true'>True</option>
                      </Select>
                    ) :
                      (
                        <Input
                          value={
                            editableInputs.includes(key)
                              ? formData[key as keyof Medicine] ?? ""
                              : data[key as keyof Medicine] || ""
                          }
                          type="text"
                          readOnly={!editableInputs.includes(key)}
                          isDisabled={!editableInputs.includes(key)}
                          onChange={(e) =>
                            handleInputChange(key as keyof Medicine, e.target.value)
                          }
                        />
                      )
                  }
                </Box>
              ))}
              <Button
                onClick={handleUpdate}
                colorScheme={COLOR_SCHEME}
                color={"white"}
              >
                Update
              </Button>
            </Box>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMedicine;
