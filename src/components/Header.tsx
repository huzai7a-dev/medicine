import {
  Button,
  HStack,
  Image,
  Link as ChakraLink,
  Box,
  Avatar,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import Logo from "../assets/icons/logo.png";
import { useAuthStore } from "../store/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const { authUser, storeToken, authToken, storeUser } = useAuthStore();

  const handleLogout = () => {
    sessionStorage.clear();
    storeToken("");
    storeUser(null);
    navigate("/");
  };

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
        {authUser?.type === "pharmacist" && (
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
      {authToken ? (
        <Menu>
          <MenuButton
            textTransform={"uppercase"}
            as={Button}
            rightIcon={
              <Avatar
                bg="red.500"
                size={"sm"}
                icon={<AiOutlineUser fontSize="1rem" />}
              />
            }
          >
            {authUser?.type}
          </MenuButton>
          <MenuList>
            <MenuItem>{authUser?.username}</MenuItem>
            {authUser?.address && <MenuItem>{authUser.address}</MenuItem>}
            {authUser?.details && <MenuItem>{authUser?.details}</MenuItem>}
            <Divider />
            <MenuItem as={Button} onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          colorScheme="cyan"
          display={"flex"}
          color={"white"}
          onClick={() => setShowLogin(true)}
        >
          Login
        </Button>
      )}
      <LoginForm isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </HStack>
  );
};

export default Header;
