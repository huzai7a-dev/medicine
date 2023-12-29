import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Switch,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent,  useState } from "react";
import { signupUser } from "../services";
import { useToast } from '@chakra-ui/react';
const Signup = () => {
  const toast = useToast();
  const { mutate: singup } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupUser,
    onError: (error : any) => {
      console.log(error?.response?.data , "message")
      let errorMessage = error?.response?.data;
      if (error?.response?.data?.errors?.length > 0) {
        errorMessage = error?.response?.data?.errors[0]?.message; // Use specific error message if available
      }
      
      toast({
        title: 'Signup Error',
        description: errorMessage,
        status: 'error',
        duration: 5000, 
        isClosable: true, 
      });
    },
    onSuccess: () =>{
      toast({
        title: 'Signup Error',
        description: 'sign in succesfully.',
        status: 'success',
        duration: 5000, 
        isClosable: true, 
      });
    } 
  })
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    mobile_no: "",
    address: "",
    details: "",
  });

  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const changedValue = {
      ...formData,
      [name]: value,
    };
    setFormData(changedValue);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      singup(formData)
 
   
  };
  return (
    <ChakraProvider>
      <Box p={4}>
        <Box maxWidth="500px" mx="auto">
          <form onSubmit={onSubmit}>
            <VStack spacing={4}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input onChange={handleChangeValue} type="text" name="name" />
              </FormControl>

              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={handleChangeValue}
                  type="text"
                  name="username"
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={handleChangeValue}
                  name="password"
                />
              </FormControl>

              <FormControl id="mobile_no">
                <FormLabel>Mobile No</FormLabel>
                <Input
                  type="tel"
                  onChange={handleChangeValue}
                  name="mobile_no"
                />
              </FormControl>

              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <Textarea onChange={handleChangeValue} name="address" />
              </FormControl>

              <FormControl id="details">
                <FormLabel>Details</FormLabel>
                <Textarea onChange={handleChangeValue} name="details" />
              </FormControl>

              <Box
                alignItems={"center"}
                display={"flex"}
                alignSelf={"flex-end"}
              >
                <FormLabel htmlFor="public" mb="0">
                  Signup as public
                </FormLabel>
                <Switch
                  colorScheme="cyan"
                  size={"sm"}
                  isChecked={true}
                  id="public"
                />
              </Box>

              <Button color={"white"} colorScheme="cyan" type="submit">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Signup;
