import React from 'react';

export default function ZayekaLogo({ size = 24, className = '', fill = 'currentColor', showText = false }) {
  const maskId = 'zayeka-flame-mask';

  // Mode 1: Emblem-Only (Ideal for the small center badge of the QR codes)
  if (!showText) {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      >
        <defs>
          <mask id={maskId}>
            {/* The white region represents what will be drawn */}
            <rect width="100" height="100" fill="#ffffff" />
            
            {/* The black paths will cut holes in the mask to create transparent flame swirls */}
            {/* Left swoosh */}
            <path 
              d="M 46 90 C 37 81 31 68 31 54 C 31 44 36 36 41 31 C 34 38 26 48 26 61 C 26 74 35 84 46 90 Z" 
              fill="#000000" 
            />
            {/* Center swoosh */}
            <path 
              d="M 52 91 C 50 76 47 60 51 45 C 53 38 57 32 61 27 C 55 34 50 46 50 62 C 50 74 52 85 52 91 Z" 
              fill="#000000" 
            />
            {/* Right swoosh */}
            <path 
              d="M 58 89 C 66 80 74 67 73 53 C 73 44 68 37 63 32 C 69 39 77 49 77 61 C 77 74 67 83 58 89 Z" 
              fill="#000000" 
            />
          </mask>
        </defs>
        
        {/* Outer flame silhouette, clipped by the mask */}
        <path 
          d="M 50 93 C 71.5 93 87 77 87 57 C 87 38.5 74.5 29 59 7 C 54 18.5 45.5 26.5 37.5 38 C 25 56 13 64 13 75.5 C 13 85.2 28.5 93 50 93 Z" 
          fill={fill} 
          mask={`url(#${maskId})`}
        />
      </svg>
    );
  }

  // Mode 2: Combined Logo (Flame Emblem + Stylized "ZAYEKA" Text underneath)
  // Uses a custom aspect ratio to lay out both elements exactly as shown in the brand asset.
  return (
    <svg 
      width={size * 1.28} // Keep exact 1.28 aspect ratio (160/125) to prevent any stretching
      height={size} 
      viewBox="0 -2.5 160 125" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        <mask id={`${maskId}-text`}>
          {/* Solid white background for the mask */}
          <rect x="30" y="0" width="100" height="96" fill="#ffffff" />
          
          {/* Swirl cutouts centered at X=80 */}
          <path 
            d="M 76 88 C 67 79 61 66 61 52 C 61 42 66 34 71 29 C 64 36 56 46 56 59 C 56 72 65 82 76 88 Z" 
            fill="#000000" 
          />
          <path 
            d="M 82 89 C 80 74 77 58 81 43 C 83 36 87 30 91 25 C 85 32 80 44 80 60 C 80 72 82 83 82 89 Z" 
            fill="#000000" 
          />
          <path 
            d="M 88 87 C 96 78 104 65 103 51 C 103 42 98 35 93 30 C 99 37 107 47 107 59 C 107 72 97 81 88 87 Z" 
            fill="#000000" 
          />
        </mask>
      </defs>
      
      {/* 1. Flame Emblem (Centered horizontally at X=80) */}
      <path 
        d="M 80 90 C 101.5 90 117 74 117 54 C 117 35.5 104.5 26 89 4 C 84 15.5 75.5 23.5 67.5 35 C 55 53 43 61 43 72.5 C 43 82.2 58.5 90 80 90 Z" 
        fill={fill} 
        mask={`url(#${maskId}-text)`}
      />

      {/* 2. Stylized Brand Typography "ZAYEKA" in High-Fidelity Vector Paths */}
      <g id="zayeka-brand-text">
        {/* Z */}
        <path d="M 39.5 100 L 48.5 100 L 39.5 116 L 48.5 116 M 41.5 108 L 46.5 108" stroke={fill} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* A */}
        <path d="M 53.5 116 L 58.5 100 L 63.5 116 M 55.5 109 L 61.5 109" stroke={fill} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Y */}
        <path d="M 69.5 100 L 74.5 108 L 79.5 100 M 74.5 108 L 74.5 116" stroke={fill} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* E */}
        <path d="M 92.5 100 L 85.5 100 L 85.5 116 L 92.5 116 M 85.5 108 L 91.5 108 M 88.5 105 L 88.5 111" stroke={fill} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* K */}
        <path d="M 97.5 100 L 97.5 116 M 105.5 100 L 97.5 108 L 105.5 116" stroke={fill} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* A */}
        <path d="M 110.5 116 L 115.5 100 L 120.5 116 M 112.5 109 L 118.5 109" stroke={fill} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
