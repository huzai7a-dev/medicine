import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Icon,
  Divider,
  useToken,
} from "@chakra-ui/react";
import { MdLocalPharmacy } from "react-icons/md";
import { COLOR_SCHEME } from "../constants/theme";

const HomePage = () => {
  // Accessing theme tokens for consistent styling
  const [green600, green300] = useToken("colors", [
    `${COLOR_SCHEME}.600`,
    `${COLOR_SCHEME}.300`,
  ]);

  // Background gradient
  const bgGradient = `linear(to-l, ${green600}, ${green300})`;

  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Container maxW="container.xl" p={4} centerContent>
      <Box
        bgGradient={bgGradient}
        p={10}
        borderRadius="lg"
        boxShadow="xl"
        color="white"
        textAlign="center"
        mb={10}
        w="full"
      >
        <Icon as={MdLocalPharmacy} w={10} h={10} mb={3} />
        <Heading as="h1" size="2xl">
          Medicine Substitute System Project
        </Heading>
        <Text fontSize="xl" fontWeight="bold" mt={3}>
          Revolutionizing Access to Affordable Medication
        </Text>
      </Box>
      <VStack
        spacing={5}
        align="stretch"
        w="full"
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        color={textColor}
      >
        <Text fontSize="md">
          At{" "}
          <Text as={"b"}>
            Institute of Business Administration (IBA) Karachi
          </Text>
          , under the guidance of <Text as={"b"}>Dr. Waqas Mahmood</Text>, we're
          proud to introduce our groundbreaking project: The{" "}
          <Text as={"b"}>Medicine Substitute System</Text>. This initiative is
          more than just a technical achievement; it's a step towards making
          healthcare more accessible and affordable for everyone.
        </Text>
        <Divider my={1} />
        <Text fontSize="md">
          In an era whee medical expenses are constantly rising, our system
          offers a beacon of hope. It's designed to help patients find
          cost-effective substitutes for expensive medications, ensuring that
          financial constraints don't compromise one's health. Our focus is on
          building a platform that is not only user-friendly but also deeply
          rooted in ethical practices and the utmost accuracy.
        </Text>
        <Text fontSize="md">
          Join us on this journey as we strive to make a difference in the lives
          of many, multiple substitute medication at a time. Stay tuned for more
          updates and insights into how we're transforming the landscape of
          healthcare accessibility in Pakistan.
        </Text>
        <Box textAlign="center" pt={5}>
          <Text as="b">
            Copyright <span>&#169;</span> IBA 2024
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;
