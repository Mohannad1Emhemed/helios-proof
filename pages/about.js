import Link from 'next/link';
import styles from './page.module.css';

export default function About() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    About Alpha Corp.
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
                <div style={{ maxWidth: 1000 }}>
                    {/* Your existing content */}
                </div>
            </div>

            <div className={styles.grid}>
                <Link href="/">
                    <a className={styles.card} rel="noopener noreferrer">
                        <h2>
                            Home
                        </h2>
                        <p>Back to the home page.</p>
                    </a>
                </Link>
            </div>
        </main>
    );
}
