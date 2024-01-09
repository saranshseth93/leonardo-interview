import Head from "next/head";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import styles from "@/styles/Home.module.css";
import UserModal from "@/components/UserModal";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { gql, useQuery } from "@apollo/client";
import MediaGrid from "@/components/MediaGrid";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  const [hasSignedUp, setHasSignedUp] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData);
    }
  }, []);

  const GET_ANIMS = gql`
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

  const variables = {
    page: 1,
    perPage: 25,
  };

  const { data, loading, error } = useQuery(GET_ANIMS, {
    skip: !hasSignedUp,
    variables,
  });

  useEffect(() => {
    if (hasSignedUp) {
      console.log(data);
    }
  }, [hasSignedUp, data]);

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
          <Header isSignedUp={hasSignedUp} />
        </div>
        <UserModal setHasSignedUp={setHasSignedUp} />

        {hasSignedUp && (
          <>
            {loading && <p>Loading...</p>}
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
