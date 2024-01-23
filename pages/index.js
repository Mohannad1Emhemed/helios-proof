import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Welcome to Alpha Corp
        </p>
        <div>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Power By{' '}
            Helios
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <div style={{maxWidth: 1000}}>
          {/* Your existing content */}
        </div>
      </div>

      <div className={styles.grid}>
        <Link href="/">
          <a className={styles.card}>
            <h2>
              Home
            </h2>
            <p>Welcome to Alpha Corp.</p>
          </a>
        </Link>

        <Link href="/about">
          <a className={styles.card}>
            <h2>
              About
            </h2>
            <p>About Alpha Corp.</p>
          </a>
        </Link>
      </div>
    </main>
  );
}
