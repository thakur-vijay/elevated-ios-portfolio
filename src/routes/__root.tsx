import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, AppDispatch, RootState } from "@/redux/store";
import { fetchUserResponse } from "../redux/features/userSlice.ts";
import { UserContext } from "../context/UserContext.tsx";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display-2xl text-foreground">
          404
        </h1>

        <h2 className="mt-2 text-xl font-semibold text-foreground">
          Page not found
        </h2>

        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Adrian Vale — Senior iOS Engineer",
      },
      {
        name: "description",
        content:
          "Premium native iOS engineering. Swift, SwiftUI, and uncompromising product craft.",
      },
      {
        name: "author",
        content: "Adrian Vale",
      },
      {
        property: "og:title",
        content: "Adrian Vale — Senior iOS Engineer",
      },
      {
        property: "og:description",
        content:
          "Premium native iOS engineering. Swift, SwiftUI, and uncompromising product craft.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Adrian Vale — Senior iOS Engineer",
      },
      {
        name: "twitter:description",
        content:
          "Premium native iOS engineering. Swift, SwiftUI, and uncompromising product craft.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7c941b25-69fc-4aee-904e-0880c69e74e0/id-preview-b35406ba--753e93df-c841-4c64-94fc-ae6250a2d2e4.lovable.app-1778086798737.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7c941b25-69fc-4aee-904e-0880c69e74e0/id-preview-b35406ba--753e93df-c841-4c64-94fc-ae6250a2d2e4.lovable.app-1778086798737.png",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <HeadContent />

        {/* Theme initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var t = localStorage.getItem("theme");

                  var d = t
                    ? t === "dark"
                    : matchMedia("(prefers-color-scheme: dark)").matches;

                  if (d) {
                    document.documentElement.classList.add("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <Provider store={store}>
      <RootContent />
    </Provider>
  );
}

function RootContent() {
  const { location } = useRouterState();

  const dispatch = useDispatch<AppDispatch>();

  const { user, status } = useSelector(
    (state: RootState) => state.user,
  );

  // Fetch user data once
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserResponse());
    }
  }, [status, dispatch]);

  // Reset scroll position when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <UserContext.Provider value={user}>
      <Navbar />

      <main className="min-h-screen pt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <ThemeToggle />
    </UserContext.Provider>
  );
}