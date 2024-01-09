import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import logo from "../public/logo.png";
import Image from "next/image";

type HeaderProps = {
  isSignedUp: boolean;
};

const Header: React.FC<HeaderProps> = ({ isSignedUp }) => {
  return (
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
          <Button variant="outline" colorScheme="teal">
            Profile
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
