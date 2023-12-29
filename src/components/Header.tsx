import {
  Button,
  HStack,
  Image,
  Link as ChakraLink,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import Logo from "../assets/icons/logo.png";
import { useAuthStore } from "../store/auth";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const userType = useAuthStore((store) => store.authUser?.type);
  return (
    <HStack display={"flex"} shadow={"base"} px={4} height={"100%"}>
      <ChakraLink as={ReactRouterLink} to="/">
        <Image src={Logo} alt="med-logo" height={100} width={100} />
      </ChakraLink>
      <Box paddingLeft={4} display={"flex"} flex={"1"} gap={4}>
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          _hover={{ textDecoration: "none" }}
        >
          <Button fontWeight={"medium"} variant={"ghost"}>
            Home
          </Button>
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to="/search-by"
          _hover={{ textDecoration: "none" }}
        >
          <Button fontWeight={"medium"} variant={"ghost"}>
            Search By
          </Button>
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to="/search-prescription"
          _hover={{ textDecoration: "none" }}
        >
          <Button fontWeight={"medium"} variant={"ghost"}>
            Prescription
          </Button>
        </ChakraLink>
        {userType === "pharmacist" && (
          <ChakraLink
            as={ReactRouterLink}
            to="/pharmacist"
            _hover={{ textDecoration: "none" }}
          >
            <Button fontWeight={"medium"} variant={"ghost"}>
              Pharmacist
            </Button>
          </ChakraLink>
        )}
      </Box>
      <Button
        colorScheme="cyan"
        display={"flex"}
        color={"white"}
        onClick={() => setShowLogin(true)}
      >
        Login
      </Button>
      <LoginForm isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </HStack>
  );
};

export default Header;
