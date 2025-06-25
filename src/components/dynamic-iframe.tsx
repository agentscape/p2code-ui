"use client";
import { useEffect, useRef, useState } from "react";

const DynamicIframe = ({ htmlContent }: { htmlContent: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState("100px"); // Default height

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.height) {
        setHeight(`${event.data.height}px`);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style> body { margin: 0; } </style>
            </head>
            <body>
              ${htmlContent}
              <script>
                function sendHeight() {
                  window.parent.postMessage({ height: document.body.scrollHeight }, "*");
                }
                window.onload = sendHeight;
                window.onresize = sendHeight;
              </script>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [htmlContent]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: "100%",
        height: height,
        border: "none",
        overflow: "hidden",
      }}
    />
  );
};

export default DynamicIframe;
