import { Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import styles from 'styles/Claim.module.scss';

const Claim = () => {
  return (
    <div>
      <Head>
        <title>Peace | Claim</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles['claim']}>
        <div className={styles['claim__header']}>

          <div>
            <div className={styles['claim__header__title']}>
              Testament claim
            </div>

            <div className={styles['claim__header__details']}>
              Don’t worry, your heir left you in good hands.
              <br />
              <br />
              Introducing Peace testament, your link to claim your funds and explore the world of DeFi.
              <br />
              <br />
              If you are new here, we recommend you to take take a deep dive into the application to see what you can do.
            </div>

            <Button 
              color='#5F4DFF'
              fontWeight={500}
              rightIcon={
                <ChevronRightIcon 
                  color='#5F4DFF' 
                  fontSize='28px'
                  marginLeft='-7px'
                  marginTop='3px'
                />
              }
              variant='link'
            >
              Learn more
            </Button>
          </div>

          <div>
            <Image src='/images/claim.png' alt='Claim video' width='700px' height='350px' />
          </div>
        </div>

        <div className={styles['claim__details']}>
            <div className={styles['claim__details__disclaimer']}>
              After the inactivity time of your heir passed, you would be able to claim the funds for you and the other beneficiaries. Please, be careful. 
            </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ defaultLocale = 'en', locale }) => {
  const translations = await serverSideTranslations(locale || defaultLocale, ['common']);

  return {
    props: {
      ...translations
    }
  };
}

export default Claim;
