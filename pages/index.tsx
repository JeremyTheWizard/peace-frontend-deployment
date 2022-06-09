import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreatePlan from 'components/create-plan';
import Head from 'next/head';

function Home() {
  return (
    <div>
      <Head>
        <title>Peace</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <CreatePlan />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ defaultLocale, locale }) => {
  const translations = await serverSideTranslations('es', ['common']);

  return {
    props: {
      ...translations
    }
  };
}

export default Home;
