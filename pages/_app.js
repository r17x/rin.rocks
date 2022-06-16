import { AppProvider } from "../components";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((x) => x);

  const children = getLayout(<Component {...pageProps} />);

  return <AppProvider>{children}</AppProvider>;
}

export default MyApp;
