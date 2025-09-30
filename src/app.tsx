import { Meta, MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import type { Component } from "solid-js";
import { Suspense } from "solid-js";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { SiteTitle } from "~/components/SiteTitle";
import "./app.css";
import { SITE_NAME } from "./consts";

const LoadingFallback: Component = () => (
  <div class="h-screen flex items-center justify-center">
    <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

const App = () => {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <SiteTitle />
          <Meta
            property="og:type"
            content="website"
          />
          <Meta
            property="og:site_name"
            content={SITE_NAME}
          />
          <Meta
            property="og:title"
            content={SITE_NAME}
          />
          <Meta
            property="og:description"
            content="Amatzk Lab"
          />
          <div class="min-h-screen flex flex-col">
            <Header />
            <main class="flex-1">
              <div class="container mx-auto px-4 max-w-screen">
                <Suspense fallback={<LoadingFallback />}>
                  {props.children}
                </Suspense>
              </div>
            </main>
            <Footer />
          </div>
        </MetaProvider>
      )}>
      <FileRoutes />
    </Router>
  );
};

export default App;
