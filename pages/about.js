import styles from './page.module.css'

export default function About() {
    return(
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
                <div style={{maxWidth: 1000}}>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non curabitur gravida arcu ac. Nisi scelerisque eu ultrices vitae. Malesuada pellentesque elit eget gravida cum. At urna condimentum mattis pellentesque id nibh tortor. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Adipiscing bibendum est ultricies integer quis auctor elit. Sed arcu non odio euismod. Urna neque viverra justo nec ultrices. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Nunc id cursus metus aliquam eleifend mi in nulla.
                    </p>
                    <br />
                    <p>
                    Tincidunt tortor aliquam nulla facilisi. Felis eget velit aliquet sagittis id consectetur purus ut. Vitae congue mauris rhoncus aenean vel. Pellentesque habitant morbi tristique senectus et netus et. Tincidunt praesent semper feugiat nibh sed. Imperdiet sed euismod nisi porta lorem mollis aliquam ut. Gravida neque convallis a cras semper. Vel facilisis volutpat est velit egestas dui id. Sem viverra aliquet eget sit amet. Maecenas pharetra convallis posuere morbi.
                    </p>
                </div>
            </div>

            <div className={styles.grid}>
                <a
                href="/"
                className={styles.card}
                rel="noopener noreferrer"
                >
                <h2>
                    Home
                </h2>
                <p>Back to the home page.</p>
                </a>
            </div>
        </main>
    );
}