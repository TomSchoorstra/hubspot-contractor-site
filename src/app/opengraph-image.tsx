import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tom Schoorstra — Independent HubSpot Contractor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(249, 115, 22, 0.12)",
            filter: "blur(80px)",
          }}
        />

        <div
          style={{
            color: "#f97316",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 28,
            display: "flex",
          }}
        >
          Independent HubSpot Contractor
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 760,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Tom Schoorstra
        </div>

        <div
          style={{
            color: "#a3a3a3",
            fontSize: 26,
            marginTop: 28,
            maxWidth: 680,
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          HubSpot automation, integrations and RevOps for growing teams.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 52,
            gap: 12,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#f97316",
              display: "flex",
            }}
          />
          <div
            style={{
              color: "#737373",
              fontSize: 18,
              display: "flex",
            }}
          >
            tomschoorstra.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
