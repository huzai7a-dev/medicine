import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services";
import { useAuthStore } from "../store/auth";
import { UserData } from "../interfaces/common";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { loginSchema, loginInitialValues } from "../lib/validationSchema";
import { COLOR_SCHEME } from "../constants/theme";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const LoginForm = ({ isOpen, onClose }: Props) => {
  const storeAuth = useAuthStore((store) => store.storeUser);
  const storeToken = useAuthStore((store) => store.storeToken);
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: (response) => {
      storeToken(response.access_token as string);
      storeAuth(response.data as UserData);
      navigate("/search-by");
      onClose();
    },
    onError: (error: unknown) => {
      toast({
        title: "login Error",
        description: error?.response?.data?.message || "login failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    onSubmit: ({ username, password }) => {
      try {
        login({ username, password });
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={() => navigate("/")} />
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <FormControl p={5}>
            <form onSubmit={formik.handleSubmit}>
              <Box display={"flex"} flexDir={"column"} gap={5}>
                <Box>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                  {formik.touched.username && formik.errors.username && (
                    <Text color="red">{formik.errors.username}</Text>
                  )}
                </Box>
                <Box>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Text color="red">{formik.errors.password}</Text>
                  )}
                </Box>
                <Button
                  type="submit"
                  colorScheme={COLOR_SCHEME}
                  color={"white"}
                  // isDisabled={!username.length || !password.length}
                >
                  Login
                </Button>
              </Box>
              <Text textAlign={"right"} marginTop={".4rem"}>
                Don't have an account?
                <Link color={"blue.400"} href="/signup">
                  {" "}
                  Sign up
                </Link>
              </Text>
            </form>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginForm;
