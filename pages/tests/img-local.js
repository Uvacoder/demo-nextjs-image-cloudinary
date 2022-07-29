import Link from 'next/link';
import Head from 'next/head';
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
        <title>Img Tag with Cloudinary URLs - Cloudinary &amp; Next Image Component</title>
        <meta name="description" content="Find more Cloudinary examples at github.com/colbyfayock/cloudinary-examples" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <Link href="/"><a>Cloudinary &amp; Next Image Component</a></Link>
          </h1>
          <h2 className={styles.subtitle}>
            Img Tag with Cloudinary URLs
          </h2>
        </div>

        <div className={styles.container}>
          <ul className={styles.images}>
            {images.map(image => {
              if ( image.id === 'beach' ) {
                image.image = beach.src;
              } else if ( image.id === 'city' ) {
                image.image = city.src;
              } else if ( image.id === 'earth' ) {
                image.image = earth.src;
              } else if ( image.id === 'galaxy' ) {
                image.image = galaxy.src;
              } else if ( image.id === 'iceberg' ) {
                image.image = iceberg.src;
              } else if ( image.id === 'jungle' ) {
                image.image = jungle.src;
              } else if ( image.id === 'mountain' ) {
                image.image = mountain.src;
              } else if ( image.id === 'waterfall' ) {
                image.image = waterfall.src;
              }
              return (
                <li key={image.id}>
                  <a href={image.link} rel="noreferrer">
                    <div className={styles.imageImage}>
                      <span
                        style={{
                          boxSizing: "border-box",
                          display: "inline-block",
                          overflow: "hidden",
                          width: "initial",
                          height: "initial",
                          background: "none",
                          opacity: 1,
                          border: 0,
                          margin: 0,
                          padding: 0,
                          position: "relative",
                          maxWidth: "100%"
                        }}
                      >
                        <span
                          style={{
                            boxSizing: "border-box",
                            display: "block",
                            width: "initial",
                            height: "initial",
                            background: "none",
                            opacity: 1,
                            border: 0,
                            margin: 0,
                            padding: 0,
                            maxWidth: "100%"
                          }}
                        >
                          <img
                            style={{
                              display: "block",
                              maxWidth: "100%",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: 1,
                              border: 0,
                              margin: 0,
                              padding: 0
                            }}
                            alt=""
                            aria-hidden="true"
                            src={`data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27${image.width}%27%20height=%27${image.height}%27/%3e`}
                          />
                        </span>
                        <img
                          alt={image.title}
                          src={image.image}
                          decoding="async"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            boxSizing: "border-box",
                            padding: 0,
                            border: "none",
                            margin: "auto",
                            display: "block",
                            width: 0,
                            height: 0,
                            minWidth: "100%",
                            maxWidth: "100%",
                            minHeight: "100%",
                            maxHeight: "100%"
                          }}
                          srcSet={`${image.image} 1x`}
                          loading="lazy"
                        />
                      </span>
                    </div>
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
