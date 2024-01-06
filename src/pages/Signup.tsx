import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../services";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { SignupSchema, SignupInitialValues } from "../lib/validationSchema";

const Signup = () => {
  const toast = useToast();
  const { mutate: signup } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupUser,
    onError: (error: any) => {
      let errorMessage = error?.response?.data;
      if (error?.response?.data?.errors?.length > 0) {
        errorMessage = error?.response?.data?.errors[0]?.message; // Use specific error message if available
      }

      toast({
        title: "Signup Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "Signup Error",
        description: "sign in successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const formik = useFormik({
    initialValues: SignupInitialValues,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      signup(values);
    },
  });

  return (
    <ChakraProvider>
      <Box p={4}>
        <Box maxWidth="500px" mx="auto">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Sign up As</FormLabel>
                <Input value={"PUBLIC"} isDisabled={true} name="public" />
              </FormControl>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <Text color="red">{formik.errors.name}</Text>
                )}
              </FormControl>

              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username && (
                  <Text color="red">{formik.errors.username}</Text>
                )}
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <Text color="red">{formik.errors.password}</Text>
                )}
              </FormControl>

              <FormControl id="mobile_no">
                <FormLabel>Mobile No</FormLabel>
                <Input
                  type="tel"
                  name="mobile_no"
                  value={formik.values.mobile_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile_no && formik.errors.mobile_no && (
                  <Text color="red">{formik.errors.mobile_no}</Text>
                )}
              </FormControl>

              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <Textarea
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                  <Text color="red">{formik.errors.address}</Text>
                )}
              </FormControl>

              <FormControl id="details">
                <FormLabel>Details</FormLabel>
                <Textarea
                  name="details"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.details && formik.errors.details && (
                  <Text color="red">{formik.errors.details}</Text>
                )}
              </FormControl>

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
