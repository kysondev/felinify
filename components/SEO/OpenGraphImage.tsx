import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Felinify";
  const description =
    searchParams.get("description") ||
    "AI Flashcards For Focused, Fast Learning";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "white",
          background: "#C96442",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="https://felinify.com/felinify.png"
          alt="Felinify Logo"
          width={120}
          height={120}
          style={{ marginBottom: "30px" }}
        />
        <h1
          style={{
            fontSize: 70,
            fontWeight: "bold",
            margin: 0,
            marginBottom: "20px",
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 30, margin: 0, opacity: 0.8 }}>{description}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
