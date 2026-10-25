function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Women in Tech logo"
    >
<rect width="64" height="64" rx="18" fill="#FCF1D0" />
<path d="M8 30 L18 52 L29 36" fill="none" stroke="#22396F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
<path d="M29 36 L40 52 L50 30" fill="none" stroke="#0D1C42" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
<polygon points="37,17 58,6 45,20" fill="#22396F" />
<polygon points="45,20 58,6 49,24" fill="#010736" />
    </svg>
  );
}

export default Logo;
