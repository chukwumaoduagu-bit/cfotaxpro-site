import React from 'react';

interface CfoTaxProLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  className?: string;
  showText?: boolean;
  textColor?: string;
  variant?: 'full' | 'icon-only' | 'badge';
}

export const CfoTaxProLogo: React.FC<CfoTaxProLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  textColor = 'text-white',
  variant = 'icon-only'
}) => {
  // Dimension mapping
  let dimension = 40;
  if (typeof size === 'number') {
    dimension = size;
  } else {
    switch (size) {
      case 'xs': dimension = 24; break;
      case 'sm': dimension = 32; break;
      case 'md': dimension = 42; break;
      case 'lg': dimension = 56; break;
      case 'xl': dimension = 80; break;
      case '2xl': dimension = 120; break;
    }
  }

  const logoSvg = (
    <svg 
      viewBox="0 0 500 500" 
      width={dimension} 
      height={dimension} 
      className={`shrink-0 select-none ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background soft circle if badge */}
      {variant === 'badge' && (
        <circle cx="250" cy="250" r="240" fill="#FFFFFF" className="drop-shadow-sm" />
      )}

      {/* Top Teal Ribbon Arc */}
      <path 
        d="M 125 72 C 185 30, 315 30, 375 72 L 392 95 L 368 98 C 315 62, 185 62, 132 98 L 108 95 Z" 
        fill="#00A896" 
      />
      
      {/* Left Gold Arc */}
      <path 
        d="M 72 125 C 30 185, 30 315, 72 375 L 95 392 L 98 368 C 62 315, 62 185, 98 132 L 95 108 Z" 
        fill="#E5A912" 
      />

      {/* Right Gold Arc */}
      <path 
        d="M 428 125 C 470 185, 470 315, 428 375 L 405 392 L 402 368 C 438 315, 438 185, 402 132 L 405 108 Z" 
        fill="#E5A912" 
      />

      {/* Bottom Teal Ribbon Arc */}
      <path 
        d="M 125 428 C 185 470, 315 470, 375 428 L 392 405 L 368 402 C 315 438, 185 438, 132 402 L 108 405 Z" 
        fill="#00A896" 
      />

      {/* Center Text in Badge if not showing horizontal lockup */}
      {variant !== 'full' && (
        <text 
          x="250" 
          y="132" 
          textAnchor="middle" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="28" 
          fill="#00A896" 
          letterSpacing="1.2"
        >
          CFO TAX PRO LLC
        </text>
      )}

      {/* Head */}
      <circle cx="174" cy="160" r="26" fill="#374151" />

      {/* Leaping Dynamic Athletic Figure with Wrench Tool */}
      <g fill="#00A896">
        {/* Dynamic Body Arc & Wing */}
        <path d="M 158 212 
                 C 192 178, 235 146, 292 138 
                 C 328 134, 338 158, 332 186 
                 C 324 168, 308 156, 276 160 
                 C 230 166, 198 198, 178 230 
                 C 214 248, 256 284, 306 314 
                 C 368 350, 420 348, 430 346 
                 C 390 360, 338 366, 288 338 
                 C 252 318, 232 304, 212 288 
                 C 222 328, 252 384, 330 426 
                 C 298 422, 258 398, 236 358 
                 C 216 320, 206 276, 200 242 
                 C 168 245, 128 248, 110 238
                 L 100 244
                 C 88 248, 68 238, 66 222
                 C 64 206, 78 196, 90 201
                 C 96 203, 100 211, 106 216
                 C 112 208, 104 196, 96 191
                 C 80 184, 68 201, 76 218
                 C 78 222, 73 226, 70 228
                 C 66 211, 73 194, 90 186
                 C 103 180, 118 191, 116 204
                 C 128 216, 158 224, 190 226
                 Z" 
        />
        
        {/* Wrench Gripper Tool Tip on Left Hand */}
        <path d="M 108 202 
                 C 95 186, 70 192, 66 212 
                 C 62 230, 76 246, 95 242 
                 L 114 230 
                 C 107 226, 103 220, 103 216 
                 C 103 212, 107 206, 114 202 Z 
                 M 86 213 
                 C 92 213, 94 218, 92 223 
                 C 90 228, 84 230, 80 226 
                 C 76 222, 78 216, 86 213 Z" 
        />
      </g>
    </svg>
  );

  if (!showText) {
    return logoSvg;
  }

  return (
    <div className="inline-flex items-center space-x-3">
      {logoSvg}
      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight text-base sm:text-lg ${textColor}`}>
          CFO TAX PRO LLC
        </span>
        <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
          Smart Business Operating System
        </span>
      </div>
    </div>
  );
};
