import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top-left accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '-6px',
            left: '-6px',
            width: '22px',
            height: '22px',
            background: 'radial-gradient(circle, #3DDC84 0%, transparent 70%)',
            opacity: 0.7,
            display: 'flex',
          }}
        />
        {/* Bottom-right accent glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-6px',
            right: '-6px',
            width: '22px',
            height: '22px',
            background: 'radial-gradient(circle, #007AFF 0%, transparent 70%)',
            opacity: 0.7,
            display: 'flex',
          }}
        />
        {/* NK initials */}
        <div
          style={{
            color: '#3DDC84',
            fontWeight: 900,
            fontSize: '18px',
            letterSpacing: '-1px',
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
