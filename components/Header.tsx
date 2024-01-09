import React from "react";
import { Flex, Box, Text, Button, Alert, AlertTitle } from "@chakra-ui/react";
import logo from "../public/logo.png";
import Image from "next/image";

type HeaderProps = {
  isSignedUp: boolean;
  onProfileClick: () => void;
  username: string;
  jobTitle: string;
};

const Header: React.FC<HeaderProps> = ({
  isSignedUp,
  onProfileClick,
  username,
  jobTitle,
}) => {
  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="1.5rem"
        bgColor="gray.800"
        color="white"
        zIndex={99}
      >
        <Box>
          <Flex align="center">
            <Image
              src={logo}
              width={50}
              height={50}
              style={{ marginRight: "8px" }}
              alt="Logo"
            />
            <Text fontSize="xl" fontWeight="bold" ml={2}>
              AniTron
            </Text>
          </Flex>
        </Box>
        <Box>
          {isSignedUp && (
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={onProfileClick}
            >
              Profile
            </Button>
          )}
        </Box>
      </Flex>
      {isSignedUp && (
        <Alert status="success" style={{ background: "blue" }}>
          <Flex justifyContent={"center"} mr={2} width={"100%"}>
            <AlertTitle>Hello, {username}</AlertTitle>
          </Flex>
        </Alert>
      )}
    </>
  );
};

export default Header;
