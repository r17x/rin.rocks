import { AppProvider } from "../components";

// import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((x) => x);

  const children = getLayout(<Component {...pageProps} />);

  return (
    <AppProvider>
      {children}
      {/** <Analytics />*/}
    </AppProvider>
  );
}

export default MyApp;
