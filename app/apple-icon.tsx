import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '36px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top-left accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '-24px',
            left: '-24px',
            width: '110px',
            height: '110px',
            background: 'radial-gradient(circle, #3DDC84 0%, transparent 70%)',
            opacity: 0.5,
            display: 'flex',
          }}
        />
        {/* Bottom-right accent glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-24px',
            right: '-24px',
            width: '110px',
            height: '110px',
            background: 'radial-gradient(circle, #007AFF 0%, transparent 70%)',
            opacity: 0.5,
            display: 'flex',
          }}
        />
        {/* NK initials */}
        <div
          style={{
            color: '#3DDC84',
            fontWeight: 900,
            fontSize: '88px',
            letterSpacing: '-4px',
            display: 'flex',
          }}
        >
          NK
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
