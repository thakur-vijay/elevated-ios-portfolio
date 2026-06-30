const GA_ID = "G-Q7FJJKPYSL";

declare global {
  interface Window {
    dataLayer: any[];
      gtag: (...args: any[]) => void;
      clarity?: (...args: any[]) => void;
  }
}

export const initGA = () => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);
};

export const trackPageView = (path: string) => {
  window.gtag?.("event", "page_view", {
    page_path: path,
  });
};