import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "../app/routes/Routes";
import { I18nProvider } from "./_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "./_metronic/layout";
import withErrorHandler from "./common/hoc/withErrorHandler";
import { ConfigProvider } from "antd";
import tr_TR from "antd/lib/locale/tr_TR";
import { GlobalProvider } from "./context/GlobalState";

function App({ store, persistor, basename }) {
  return (
    <ConfigProvider locale={tr_TR}>
      <GlobalProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
            <React.Suspense fallback={<LayoutSplashScreen />}>
              <BrowserRouter basename={basename}>
                <MaterialThemeProvider>
                  <I18nProvider>
                    <Routes />
                  </I18nProvider>
                </MaterialThemeProvider>
              </BrowserRouter>
            </React.Suspense>
          </PersistGate>
        </Provider>
      </GlobalProvider>
    </ConfigProvider>
  );
}

export default withErrorHandler(App);
