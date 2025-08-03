import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DM_Sans } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PostProvider } from "../context/postContext";
config.autoAddCss = false;

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UserProvider>
      <PostProvider>
        <main className={`${dmSans.className}`}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </main>
      </PostProvider>
    </UserProvider>
  );
}

export default MyApp;
