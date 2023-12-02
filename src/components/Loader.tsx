import { Skeleton, Stack } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Stack marginTop={12}>
      <Skeleton height="50px" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Skeleton marginTop={2} key={i} height="20px" />
      ))}
    </Stack>
  );
};

export default Loader;
