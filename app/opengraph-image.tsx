import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { YEARS_OF_EXPERIENCE_LABEL } from '@/lib/site';

export const alt = 'Nafis Kabbo - Product-focused Mobile Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const [personalBuf, logoBuf] = await Promise.all([
    readFile(join(process.cwd(), 'assets/og/personal.png')),
    readFile(join(process.cwd(), 'assets/og/logo.png')),
  ]);

  const personalSrc = `data:image/png;base64,${personalBuf.toString('base64')}`;
  const logoSrc = `data:image/png;base64,${logoBuf.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: '#0D1F12',
          overflow: 'hidden',
          padding: '48px 56px 56px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            background:
              'radial-gradient(ellipse at 20% 30%, rgba(61, 220, 132, 0.28), transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(0, 191, 165, 0.18), transparent 50%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 48,
          }}
        >
          <img src={logoSrc} width={56} height={56} alt="" style={{ borderRadius: 14 }} />
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#E2E8F0',
              letterSpacing: '-0.02em',
            }}
          >
            Nafis Kabbo
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 48,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              gap: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: 999,
                background: 'rgba(61, 220, 132, 0.14)',
                border: '1px solid rgba(61, 220, 132, 0.35)',
                color: '#3DDC84',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Open for new products
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 56,
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
              }}
            >
              Product-focused Mobile Developer
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 26,
                color: '#94A3B8',
                lineHeight: 1.4,
              }}
            >
              {`Android · iOS · Flutter · ${YEARS_OF_EXPERIENCE_LABEL} years · 50+ store releases`}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 280,
              height: 280,
              borderRadius: 999,
              padding: 6,
              background: 'linear-gradient(135deg, #3DDC84, #00BFA5)',
              boxShadow: '0 20px 60px rgba(61, 220, 132, 0.35)',
              flexShrink: 0,
            }}
          >
            <img
              src={personalSrc}
              width={268}
              height={268}
              alt=""
              style={{
                borderRadius: 999,
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
