import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Box,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

type Media = {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  siteUrl: string;
  coverImage: {
    extraLarge: string;
  };
  genres: string[];
};

type Props = {
  media: Media | null;
  isOpen: boolean;
  onClose: () => void;
};

const MediaDetailModal: React.FC<Props> = ({ media, isOpen, onClose }) => {
  if (!media) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{media.title.english || media.title.romaji}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" align="center" mb="4">
            <Image
              src={media.coverImage.extraLarge}
              alt={media.title.english || media.title.romaji}
            />
            <Box mt="4" textAlign={"center"}>
              <Link href={media.siteUrl} passHref>
                <ChakraLink
                  color="yellow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More...
                </ChakraLink>
              </Link>
              <Box mt={6}>
                {media.genres.map((genre, index) => (
                  <Text
                    key={index}
                    fontSize="small"
                    as="span"
                    ml={index > 0 ? 2 : 0}
                  >
                    <Box as="span" color="red.500" mr="1">
                      •
                    </Box>
                    {genre}
                  </Text>
                ))}
              </Box>
            </Box>
          </Flex>
          {/* Additional media details can be added here */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MediaDetailModal;
