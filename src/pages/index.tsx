import Head from "next/head";
import Signup from "@/pages/signup";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nurse Management</title>
        <meta name="description" content="We manage nurse here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Signup />
    </>
  );
}
