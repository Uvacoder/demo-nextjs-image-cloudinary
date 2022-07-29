import { promises as fs } from 'fs';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import { median } from 'simple-statistics'

import styles from '../styles/Home.module.css';

const RUNS_PER_TEST = 3;

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

        const sets = [];

        for ( let j = 0; j < RUNS_PER_TEST; j++ ) {
          const data = await fetch('/api/audit', {
            method: 'POST',
            body: JSON.stringify({
              url: `${url}?timestamp=${Date.now()}`
            })
          }).then(r => r.json());
          sets.push(data);
        }

        function medianFromSet(set, { report, category, indicator }) {
          const data = set.map(item => item.lighthouseResult[report][category][indicator]);
          return median(data);
        }

        allResults[test.id] = {
          id: test.id,
          results: {
            performance: medianFromSet(sets, { report: 'categories', category: 'performance', indicator: 'score' }),
            speedIndex: medianFromSet(sets, { report: 'audits', category: 'speed-index', indicator: 'score' }),
            largestContentfulPaint: medianFromSet(sets, { report: 'audits', category: 'largest-contentful-paint', indicator: 'score' }),
            modernImageFormats: medianFromSet(sets, { report: 'audits', category: 'modern-image-formats', indicator: 'score' }),
            usesOptimizedImages: medianFromSet(sets, { report: 'audits', category: 'uses-optimized-images', indicator: 'score' }),
            usesResponsiveImages: medianFromSet(sets, { report: 'audits', category: 'uses-responsive-images', indicator: 'score' }),
            totalByteWeight: medianFromSet(sets, { report: 'audits', category: 'total-byte-weight', indicator: 'numericValue' }),
          }
        };

        updateTests({ ...allResults });

        console.groupCollapsed(`Test: ${test.id}`);
        console.log(`URL: ${url}`);
        console.log('Results:');
        console.log(sets);
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
        </div>

        <div className={styles.container}>
          <p>
            Runs per Test: {RUNS_PER_TEST}
          </p>
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
                const { id, results } = tests[key];
                return (
                  <tr key={id}>
                    <td>
                      <Link href={`/tests/${id}`}>
                        <a>{id}</a>
                      </Link>
                    </td>
                    <td>
                      { !results && status === 'running' && <FaSpinner />}
                      { results && ( results.performance * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !results && status === 'running' && <FaSpinner />}
                      { results && ( results.speedIndex * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !results && status === 'running' && <FaSpinner />}
                      { results && ( results.largestContentfulPaint * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !results && status === 'running' && <FaSpinner />}
                      { results && ( results.modernImageFormats * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !results && status === 'running' && <FaSpinner />}
                      { results && ( results.usesOptimizedImages * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !results && status === 'running' && <FaSpinner />}
                      { results && ( results.usesResponsiveImages * 100 ).toFixed(0) }
                    </td>
                    <td>
                      { !results && status === 'running' && <FaSpinner />}
                      { results && ( results.totalByteWeight / 100 ).toFixed(2) } kb
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