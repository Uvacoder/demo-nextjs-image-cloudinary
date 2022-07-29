import { promises as fs } from 'fs';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';

import styles from '../styles/Home.module.css';

export default function Home({ tests: defaultTests }) {
  const [status, updateStatus] = useState('ready');
  const [tests, updateTests] = useState(defaultTests);

  useEffect(() => {
    if ( status !== 'begin' ) return;

    updateTests(defaultTests);
    updateStatus('running');

    (async function run() {
      const allResults = { ...tests };
      const testsToRun = Object.keys(tests).map(key => tests[key]);

      for ( let i = 0, testsLen = testsToRun.length; i < testsLen; i++ ) {
        const test = testsToRun[i];
        const url = `${process.env.NEXT_PUBLIC_APP_HOSTNAME}/tests/${test.id}`;

        console.log(`Running test ${test.id}`);

        const data = await fetch('/api/audit', {
          method: 'POST',
          body: JSON.stringify({
            url
          })
        }).then(r => r.json());

        allResults[test.id] = {
          id: test.id,
          results: data
        };

        updateTests({ ...allResults });

        console.groupCollapsed(`Test: ${test.id}`);
        console.log(`URL: ${url}`);
        console.log('Results:');
        console.log(data);
        console.groupEnd();
      }

      updateStatus('ready');
    })();
  }, [status]);


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
          <p>
            Status: {status}
          </p>
          <p>
            <button onClick={() => updateStatus('begin')}>Start</button>
          </p>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <td><strong>Test</strong></td>
                <td><strong>Performance</strong></td>
                <td><strong>Speed Index</strong></td>
                <td><strong>LCP</strong></td>
                <td><strong>Modern Formats</strong></td>
                <td><strong>Optimized</strong></td>
                <td><strong>Proper Sizing</strong></td>
                <td><strong>Total Size</strong></td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(tests).map(key => {
                const { id, results = {} } = tests[key];
                const { lighthouseResult } = results;
                return (
                  <tr key={id}>
                    <td>
                      <Link href={`/tests/${id}`}>
                        <a>{id}</a>
                      </Link>
                    </td>
                    <td>
                      { !lighthouseResult && status === 'running' && <FaSpinner />}
                      { lighthouseResult && ( lighthouseResult?.categories.performance.score * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !lighthouseResult && status === 'running' && <FaSpinner />}
                      { lighthouseResult && ( lighthouseResult?.audits['speed-index'].score * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !lighthouseResult && status === 'running' && <FaSpinner />}
                      { lighthouseResult && ( lighthouseResult?.audits['largest-contentful-paint'].score * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !lighthouseResult && status === 'running' && <FaSpinner />}
                      { lighthouseResult && ( lighthouseResult?.audits['modern-image-formats'].score * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !lighthouseResult && status === 'running' && <FaSpinner />}
                      { lighthouseResult && ( lighthouseResult?.audits['uses-optimized-images'].score * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !lighthouseResult && status === 'running' && <FaSpinner />}
                      { lighthouseResult && ( lighthouseResult?.audits['uses-responsive-images'].score * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !lighthouseResult && status === 'running' && <FaSpinner />}
                      { lighthouseResult && ( lighthouseResult?.audits['total-byte-weight'].numericValue / 1000 ).toFixed(2) } kb
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </main>
    </>
  )
}

export async function getStaticProps() {
  const dir = await fs.readdir('pages/tests');
  const tests = {};

  dir.forEach(name => {
    const id = name.replace('.js', '');
    tests[id] = { id };
  });

  return {
    props: {
      tests
    }
  }
}