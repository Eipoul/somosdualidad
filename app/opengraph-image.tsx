import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Somos Dualidad";
export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FAF7F2, #E8E1D7)",
          color: "#1B1B1B",
          padding: "72px"
        }}
      >
        <p style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", opacity: 0.75 }}>Somos Dualidad</p>
        <h1 style={{ fontSize: 84, lineHeight: 1.06, margin: "20px 0 0" }}>TODO: Tu mensaje principal</h1>
      </div>
    ),
    size
  );
}
