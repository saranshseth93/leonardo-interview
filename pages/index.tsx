import Head from "next/head";
import { Plus_Jakarta_Sans } from "next/font/google";
import styles from "@/styles/Home.module.css";
import UserModal from "@/components/UserModal";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { gql, useQuery } from "@apollo/client";
import MediaGrid from "@/components/MediaGrid";
import { Text } from "@chakra-ui/react";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  const [hasSignedUp, setHasSignedUp] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [userUpdated, setUserUpdated] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData);
      const { username, jobTitle } = parsedData;
      setUsername(username);
      setJobTitle(jobTitle);
    }
  }, [hasSignedUp, userUpdated]);

  const { data, loading, error } = useQuery(GET_ANIMS, {
    skip: !hasSignedUp,
    variables,
  });

  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal is open by default

  const handleProfileClick = () => {
    setIsProfileEdit(true);
    setIsModalOpen(true);
    setUserUpdated(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (isProfileEdit) {
      setUserUpdated(true);
      setIsProfileEdit(false);
    }
  };

  return (
    <>
      <Head>
        <title>Welcome | Leonardo AI</title>
        <meta
          name="description"
          content="Technical Interview question for Leonardo AI"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={`${styles.header}`}>
          <Header
            isSignedUp={hasSignedUp}
            onProfileClick={handleProfileClick}
            username={username}
            jobTitle={jobTitle}
          />
        </div>
        <UserModal
          isProfileEdit={isProfileEdit}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          setHasSignedUp={setHasSignedUp}
        />

        {hasSignedUp && username !== "" && jobTitle !== "" && (
          <>
            {loading && <Text pt={12}>Loading...</Text>}
            {error && <p>Error :</p>}
            {data && (
              <MediaGrid
                mediaData={data.Page.media}
                hasSignedUp={hasSignedUp}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}

// GraphQL query to fetch data from AniList API
export const GET_ANIMS = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: MANGA, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
        }
        genres
        siteUrl
        coverImage {
          extraLarge
          large
          medium
        }
      }
    }
  }
`;

export const variables = {
  page: 1,
  perPage: 25,
};
