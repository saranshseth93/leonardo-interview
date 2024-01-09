import Head from "next/head";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import styles from "@/styles/Home.module.css";
import UserModal from "@/components/UserModal";
import { useEffect } from "react";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData);
    }
  }, []);

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
        <UserModal />
      </main>
    </>
  );
}
