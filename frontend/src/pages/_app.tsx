import { type AppType } from "next/dist/shared/lib/utils";
import { LoginProvider } from "~/components/hooks/LoginContext";
import TrpcProvider from "~/components/hooks/TrpcProvider";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <TrpcProvider>
      <LoginProvider>
        <Component {...pageProps} />
      </LoginProvider>
    </TrpcProvider>
  );
};

export default MyApp;
