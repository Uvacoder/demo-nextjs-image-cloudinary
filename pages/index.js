import { promises as fs } from 'fs';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home({ tests }) {
  return (
    <>
      <Head>
        <title>Cloudinary &amp; Next Image Component</title>
        <meta name="description" content="Find more Cloudinary examples at github.com/colbyfayock/cloudinary-examples" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Cloudinary &amp; Next Image Component
          </h1>
          <h2 className={styles.subtitle}>
            Index
          </h2>
        </div>

        <div className={styles.container}>
          <ul>
            {tests.map(test => {
              return (
                <li key={test}>
                  <Link href={`/tests/${test}`}>
                    <a>{test}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

      </main>
    </>
  )
}

export async function getStaticProps() {
  const dir = await fs.readdir('pages/tests');
  const tests = dir.map(name => name.replace('.js', ''));
  return {
    props: {
      tests
    }
  }
}