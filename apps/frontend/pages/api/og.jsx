// pages/api/og.jsx

import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default function OG(req) {
  const name = "r17{x}";
  const domain = "rin.rocks";
  try {
    const { searchParams } = new URL(req.url);
    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title").slice(0, 100) : "Hello 🙋 everybody!";
    return new ImageResponse(
      (
        <div
          style={{
            color: "#805AD5",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1A202C",
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              left: 42,
              top: 42,
              position: "absolute",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "whitesmoke",
                textDecoration: "underline",
                textDecorationColor: "#805AD5",
                marginLeft: 8,
                fontSize: 20,
              }}
            >
              {domain}
            </span>
          </div>
          <div
            style={{
              right: 42,
              top: 42,
              position: "absolute",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255, 255, 255, 0.64)",
                marginLeft: 8,
                fontSize: 20,
              }}
            >
              {name}
            </span>
          </div>
          <div
            style={{
              maxWidth: 700,
              maxHeight: 440,
              borderWidth: 2,
              borderColor: "rgba(0, 0, 0, 0.16)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              padding: 23,
              marginTop: 40,
              marginBottom: 40,
            }}
          >
            {title}
          </div>
        </div>
      ),
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
