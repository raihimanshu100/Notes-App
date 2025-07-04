// client/src/components/LogoHeader.jsx
import React from 'react';

const LogoHeader = ({ align = 'center' }) => {
  const justifyContent = align === 'left' ? 'flex-start' : 'center';

  return (
    <div
      className="logo-header"
      style={{
        display: 'flex',
        justifyContent,
        alignItems: 'center',
        marginBottom: '2rem',
        paddingLeft: align === 'left' ? '1rem' : '0',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#2979ff"
        style={{ width: '32px', height: '32px', marginRight: '8px' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M17.72 17.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M17.72 6.28l1.06-1.06M12 7.5A4.5 4.5 0 1012 16.5a4.5 4.5 0 000-9z"
        />
      </svg>
      <h2 style={{ fontWeight: '700', fontSize: '1.75rem', color: '#1a1a1a' }}>HD</h2>
    </div>
  );
};

export default LogoHeader;
