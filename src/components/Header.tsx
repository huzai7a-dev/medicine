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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import Logo from "../assets/icons/logo.png";
import { useAuthStore } from "../store/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { COLOR_SCHEME } from "../constants/theme";

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
          <Button
            color={`${COLOR_SCHEME}.400`}
            fontWeight={"medium"}
            fontFamily={"heading"}
            variant={"ghost"}
          >
            Home
          </Button>
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to="/search-by"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            color={`${COLOR_SCHEME}.400`}
            fontWeight={"medium"}
            fontFamily={"heading"}
            variant={"ghost"}
          >
            Search by
          </Button>
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to="/search-prescription"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            color={`${COLOR_SCHEME}.400`}
            fontWeight={"medium"}
            fontFamily={"heading"}
            variant={"ghost"}
          >
            Prescription
          </Button>
        </ChakraLink>
        {authUser?.type === "pharmacist" && (
          <ChakraLink
            as={ReactRouterLink}
            to="/pharmacist"
            _hover={{ textDecoration: "none" }}
          >
            <Button
              color={`${COLOR_SCHEME}.400`}
              fontWeight={"medium"}
              fontFamily={"heading"}
              variant={"ghost"}
            >
              Pharmacist
            </Button>
          </ChakraLink>
        )}
      </Box>
      {authToken ? (
        <div style={{ zIndex: 3 }}>
          <Menu>
            <MenuButton
              textTransform={"uppercase"}
              as={Button}
              paddingY={6}
              bgColor={`${COLOR_SCHEME}.50`}
              color={`${COLOR_SCHEME}.400`}
              leftIcon={
                <Avatar
                  bg={`${COLOR_SCHEME}.500`}
                  size={"sm"}
                  icon={<AiOutlineUser fontSize="1rem" />}
                />
              }
            >
              {authUser?.type}
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Text as={"b"}>Username:</Text> {authUser?.username}
              </MenuItem>
              {authUser?.address && (
                <MenuItem>
                  <Text as={"b"}>Address:</Text> {authUser.address}
                </MenuItem>
              )}
              {authUser?.details && (
                <MenuItem>
                  <Text as={"b"}>Details:</Text> {authUser?.details}
                </MenuItem>
              )}
              <Divider />
              <MenuItem as={Button} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      ) : (
        <Button
          colorScheme={COLOR_SCHEME}
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
