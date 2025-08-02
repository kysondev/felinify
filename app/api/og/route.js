import { ImageResponse } from 'next/og';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Clami';
  const description = searchParams.get('description') || 'AI Flashcards For Focused, Fast Learning';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          color: 'white',
          background: 'linear-gradient(to right, #C96442, #E28B62)',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
          fontSize: 60,
          fontWeight: 'bold',
        }}>
          <span>Clami</span>
        </div>
        <h1 style={{ fontSize: 70, fontWeight: 'bold', margin: 0, marginBottom: '20px' }}>
          {title}
        </h1>
        <p style={{ fontSize: 30, margin: 0, opacity: 0.8 }}>
          {description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}