import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

import images from '../../images-loader.json';

function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src
}

function cloudinaryLoader({
  config,
  src,
  width,
  quality,
}) {
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')]
  const paramsString = params.join(',') + '/'
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${paramsString}${normalizeSrc(src)}`
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Image with Cloudinary Loader - Cloudinary &amp; Next Image Component</title>
        <meta name="description" content="Find more Cloudinary examples at github.com/colbyfayock/cloudinary-examples" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <Link href="/"><a>Cloudinary &amp; Next Image Component</a></Link>
          </h1>
          <h2 className={styles.subtitle}>
            Next Image with Cloudinary Loader
          </h2>
        </div>

        <div className={styles.container}>
          <ul className={styles.images}>
            {images.map(image => {
              return (
                <li key={image.id}>
                  <a href={image.link} rel="noreferrer">
                    <Image
                      width={image.width}
                      height={image.height}
                      src={image.image}
                      alt={image.title}
                      loader={cloudinaryLoader}
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
