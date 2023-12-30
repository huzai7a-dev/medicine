import  { useEffect, useState } from 'react';
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
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Medicine } from "../interfaces/medicine";
import { updateMed } from "../services";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Medicine;
}

const orderedProperties = [
  'brand_name',
  'company_name',
  'dosage_form',
  'formula',
  'formulation',
  'efficacy',
  'is_public',
  'pack_size',
  'reg_no',
  'remarks',
  'milligrams',
  'mrp',
];

const UpdateMedicine = ({ isOpen, onClose, data }: Props) => {
  const toast = useToast();
  const [formData, setFormData] = useState<Medicine>(data)

  const handleInputChange = (key: keyof Medicine, value: string | number | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };




  const { mutate: update } = useMutation({
    mutationKey: ["update"],
    mutationFn: updateMed ,
    onSuccess: () => {
      onClose();
      toast({
        title: 'Update',
        description: ' medicine updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'Update Error',
        description: error.message || 'Failed to update medicine',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });
  const arr = ['remarks', 'milligrams', 'mrp']
  const handleUpdate = async () => {
    update(formData)
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"large"} scrollBehavior='inside' >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <FormControl p={5} >
            <Box display={"flex"} flexDir={"column"} gap={5}>
            {orderedProperties.map((key) => (
                <Box key={key}>
                  <FormLabel>{key.replace(/_/g, ' ')}</FormLabel>
                  <Input
                    value={arr.includes(key) ? formData[key as keyof Medicine] ?? '' : data[key as keyof Medicine] || ''}
                    type='text'
                    readOnly={!arr.includes(key)}
                    isDisabled={!arr.includes(key)}
                    onChange={(e) => handleInputChange(key as keyof Medicine, e.target.value)}
                  />
                </Box>
              ))}
              <Button
                onClick={handleUpdate}
                colorScheme="cyan"
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
