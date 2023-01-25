import type { AppProps } from "next/app";

import store from "../../store";
import { Provider } from "react-redux";
import Modal from "react-modal";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  Modal.setAppElement("#__next");

  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
