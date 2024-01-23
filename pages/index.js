import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Welcome to Alaph Corp
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id interdum velit laoreet id donec ultrices tincidunt arcu. Sed cras ornare arcu dui vivamus arcu felis. Aenean pharetra magna ac placerat. Vestibulum morbi blandit cursus risus at ultrices. Non enim praesent elementum facilisis leo vel fringilla. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet est placerat in egestas erat imperdiet sed euismod. Quis auctor elit sed vulputate mi sit amet. Tempus quam pellentesque nec nam. Dolor morbi non arcu risus. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Dignissim suspendisse in est ante in. Malesuada nunc vel risus commodo viverra maecenas accumsan. Luctus venenatis lectus magna fringilla. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Integer vitae justo eget magna fermentum iaculis eu non.
          </p>
          <br />
          <p>
            Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Mi bibendum neque egestas congue quisque egestas diam in arcu. Lorem sed risus ultricies tristique nulla aliquet. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Donec pretium vulputate sapien nec. Nec dui nunc mattis enim ut tellus elementum sagittis. Neque gravida in fermentum et sollicitudin. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Pharetra convallis posuere morbi leo. Eu mi bibendum neque egestas. Neque sodales ut etiam sit amet nisl purus in mollis. Magna etiam tempor orci eu lobortis elementum nibh. Non tellus orci ac auctor augue mauris augue neque. Odio ut enim blandit volutpat maecenas. Neque volutpat ac tincidunt vitae semper quis lectus.
          </p>
          <br />
          <p>
            Auctor eu augue ut lectus arcu bibendum at varius. Vel eros donec ac odio tempor orci. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Nisl pretium fusce id velit ut tortor. Tempor commodo ullamcorper a lacus. Condimentum mattis pellentesque id nibh. Eleifend mi in nulla posuere sollicitudin. Rhoncus dolor purus non enim praesent elementum facilisis leo. Facilisi nullam vehicula ipsum a arcu cursus. Ornare suspendisse sed nisi lacus sed viverra. Blandit cursus risus at ultrices mi tempus imperdiet nulla. Sit amet consectetur adipiscing elit duis tristique. Placerat vestibulum lectus mauris ultrices eros in cursus turpis massa.
          </p>
          <br />
          <p>
            Ultrices in iaculis nunc sed augue lacus viverra vitae congue. Turpis massa tincidunt dui ut ornare lectus sit amet. Tincidunt augue interdum velit euismod in pellentesque massa. Sed risus pretium quam vulputate dignissim. Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Montes nascetur ridiculus mus mauris vitae. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Rhoncus est pellentesque elit ullamcorper dignissim. Et leo duis ut diam quam nulla porttitor. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam.
          </p>
          <br />
          <p>
            Ac placerat vestibulum lectus mauris ultrices eros in cursus. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Duis ut diam quam nulla porttitor massa id neque aliquam. Bibendum enim facilisis gravida neque convallis a cras semper. Felis eget velit aliquet sagittis. Pretium lectus quam id leo in vitae turpis massa sed. Ac tincidunt vitae semper quis. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Nulla pharetra diam sit amet nisl suscipit adipiscing. Hendrerit dolor magna eget est lorem ipsum dolor.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="/about"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            About
          </h2>
          <p>About Alpha Corp.</p>
        </a>
      </div>
    </main>
  )
}
