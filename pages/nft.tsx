import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import styles from 'styles/Vault.module.scss';

const NFT = () => {
  return (
    <div>
      <Head>
        <title>Peace</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Box
          display="flex"
          alignContent="center"
          flexDirection="column"
          marginTop={20}
        >
          <Box className={styles.title}>✌️ Coming soon</Box>
          <Box className={styles.title}>
            Don&apos;t let your legacy <br /> be forgotten
          </Box>
          <Box className={styles.subtitle}>Memorial NFTs</Box>

          <div style={{ maxWidth: '60%', margin: '0 auto' }}>
            <Image
              alt="vault"
              layout="fixed"
              height={400}
              width={500}
              src="/images/nft.png"
            />
          </div>
        </Box>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  defaultLocale = 'en',
  locale,
}) => {
  const translations = await serverSideTranslations(locale || defaultLocale, [
    'common',
  ]);

  return {
    props: {
      ...translations,
    },
  };
};

export default NFT;
