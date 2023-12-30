import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginUser } from "../services";
import { useAuthStore } from "../store/auth";
import { UserData } from "../interfaces/common";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const LoginForm = ({ isOpen, onClose }: Props) => {
  const storeAuth = useAuthStore((store) => store.storeUser);
  const storeToken = useAuthStore((store) => store.storeToken);
  const navigate = useNavigate();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: (response) => {
      storeToken(response.access_token as string);
      storeAuth(response.data as UserData);
      navigate("/search-by")
      onClose(); 
    },
    onError: (error :any)=>{
      // console.log(error?.response?.data?.message);
      toast({
        title: 'login Error',
        description:  error?.response?.data?.message ||'login failed' ,
        status: 'error',
        duration: 5000, 
        isClosable: true, 
      });
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <FormControl p={5}>
            <Box display={"flex"} flexDir={"column"} gap={5}>
              <Box>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
              </Box>
              <Box>
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </Box>
              <Button
                onClick={() => login({ username, password })}
                colorScheme="cyan"
                color={"white"}
                disabled={!username.length  || !password.length}
              >
                Login
              </Button>
            </Box>
            <Text textAlign={"right"} marginTop={".4rem"}>
              Don't have an account?
              <Link color={"blue.400"} href="/signup">
                {" "}
                Singup
              </Link>
            </Text>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginForm;
