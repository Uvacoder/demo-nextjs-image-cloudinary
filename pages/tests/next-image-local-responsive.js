import Link from 'next/Link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

import images from '../../images-local.json';

import beach from '../../public/images/beach.jpg';
import city from '../../public/images/city.jpg';
import earth from '../../public/images/earth.jpg';
import galaxy from '../../public/images/galaxy.jpg';
import iceberg from '../../public/images/iceberg.jpg';
import jungle from '../../public/images/jungle.jpg';
import mountain from '../../public/images/mountain.jpg';
import waterfall from '../../public/images/waterfall.jpg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Responsive Next Image with Local Images - Cloudinary &amp; Next Image Component</title>
        <meta name="description" content="Find more Cloudinary examples at github.com/colbyfayock/cloudinary-examples" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <Link href="/"><a>Cloudinary &amp; Next Image Component</a></Link>
          </h1>
          <h2 className={styles.subtitle}>
            Responsive Next Image with Local Images
          </h2>
        </div>

        <div className={styles.container}>
          <ul className={styles.images}>
            {images.map(image => {
              if ( image.id === 'beach' ) {
                image.image = beach;
              } else if ( image.id === 'city' ) {
                image.image = city;
              } else if ( image.id === 'earth' ) {
                image.image = earth;
              } else if ( image.id === 'galaxy' ) {
                image.image = galaxy;
              } else if ( image.id === 'iceberg' ) {
                image.image = iceberg;
              } else if ( image.id === 'jungle' ) {
                image.image = jungle;
              } else if ( image.id === 'mountain' ) {
                image.image = mountain;
              } else if ( image.id === 'waterfall' ) {
                image.image = waterfall;
              }
              return (
                <li key={image.id}>
                  <a href={image.link} rel="noreferrer">
                    <Image
                      width={image.width}
                      height={image.height}
                      src={image.image}
                      alt={image.title}
                      layout="responsive"
                    />
                    <h3 className={styles.imageTitle}>
                      { image.title }
                    </h3>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

      </main>
    </>
  )
}
