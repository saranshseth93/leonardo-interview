import React, { useState } from "react";
import { Box, Image, Text, Grid, Skeleton, Flex } from "@chakra-ui/react";
import MediaDetailModal from "./MediaDetailModal";

type Media = {
  genres: any;
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  siteUrl: string;
  coverImage: {
    extraLarge: string;
  };
};

type Props = {
  mediaData: Media[];
  hasSignedUp: boolean;
};

const truncateTitle = (title: string, maxLength: number = 50) => {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  }
  return title;
};

const MediaCard: React.FC<{ media: Media }> = ({ media }) => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    bg="white"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    height="100%"
    cursor={"pointer"}
  >
    <Image
      src={media.coverImage.extraLarge}
      alt={media.title.english || media.title.romaji}
      width={"100%"}
      height="70%"
      objectFit="cover"
    />
    <Flex direction="column" p="6" flex="1" justifyContent="space-between">
      <Text fontSize={"medium"} fontWeight="bold" color={"black"} mb="2">
        {truncateTitle(media.title.english || media.title.romaji)}
      </Text>
      <Box display="flex" flexWrap="wrap" justifySelf={"flex-end"}>
        {media.genres.slice(0, 2).map((genre: string, index: React.Key) => (
          <Text
            key={index}
            fontSize="small"
            color="gray.600"
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
    </Flex>
  </Box>
);

const MediaGrid: React.FC<Props> = ({ mediaData, hasSignedUp }) => {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (media: Media) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  return (
    <>
      <Grid
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        pt={10}
      >
        {hasSignedUp
          ? mediaData.map((media) => (
              <Box
                onClick={() => handleCardClick(media)}
                key={media.id}
                cursor="pointer"
              >
                <MediaCard media={media} />
              </Box>
            ))
          : Array(25)
              .fill(0)
              .map((_, index) => <Skeleton key={index} height="250px" />)}
      </Grid>

      <MediaDetailModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MediaGrid;
