"use client";
import Script from "next/script";

export default function KofiWidget() {
  const kofiConfig = {
    type: "floating-chat",
    "floating-chat.donateButton.text": "Support",
    "floating-chat.donateButton.background-color": "#00b9fe",
  };

  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.kofiWidgetOverlay?.draw("manix365", kofiConfig);
      }}
    />
  );
}
