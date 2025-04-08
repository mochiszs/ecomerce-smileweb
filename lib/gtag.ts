// utils/gtag.ts

declare global {
    interface Window {
      gtag?: (...args: any[]) => void;
    }
  }
  
  // ID de conversión de Google Ads
  const CONVERSION_ID = "AW-16592582067/lI4QCMrVvNwZELPr-uc";
  
  /**
   * Lanza un evento de conversión de Google Ads usando gtag.
   */
  export const trackConversion = (): void => {
    const trigger = () => {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: CONVERSION_ID,
        });
      } else {
        // Reintenta en 500ms si gtag aún no está definido
        console.warn("gtag aún no está disponible. Reintentando...");
        setTimeout(trigger, 500);
      }
    };
  
    trigger();
  };
  