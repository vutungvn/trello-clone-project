const COLUMN = {
  y: 42,
  width: 52,
  height: 74,
  rx: 6,
  fill: "#FFFFFF",
  stroke: "#B3B9C4",
  strokeWidth: 1.5,
};

const CARD = {
  width: 40,
  rx: 4,
  fill: "#F1F2F4",
  stroke: "#B3B9C4",
  strokeWidth: 1.5,
};

const COLUMN_TITLE = {
  y: 49,
  height: 4,
  rx: 2,
  fill: "#8590A2",
  fillOpacity: 0.35,
};

export function LockedBoardIllustration() {
  return (
    <svg
      width="220"
      height="152"
      viewBox="0 0 220 152"
      fill="none"
      aria-hidden="true"
    >
      {/* Khung bảng */}
      <rect
        x="10"
        y="12"
        width="200"
        height="120"
        rx="10"
        fill="#F1F2F4"
        stroke="#8590A2"
        strokeWidth="2"
      />
      <path
        d="M10 22C10 16.4772 14.4772 12 20 12H200C205.523 12 210 16.4772 210 22V32H10V22Z"
        fill="#E9F2FF"
      />
      <line x1="10" y1="32" x2="210" y2="32" stroke="#8590A2" strokeWidth="2" />
      <circle cx="24" cy="22" r="3" fill="#8590A2" />
      <rect
        x="34"
        y="19"
        width="44"
        height="6"
        rx="3"
        fill="#8590A2"
        fillOpacity="0.35"
      />

      {/* Ba cột */}
      <rect x="22" {...COLUMN} />
      <rect x="28" width="26" {...COLUMN_TITLE} />
      <rect x="28" y="59" height="16" {...CARD} />
      <rect x="28" y="81" height="16" {...CARD} />

      <rect x="84" {...COLUMN} />
      <rect x="90" width="28" {...COLUMN_TITLE} />
      <rect x="90" y="59" height="20" {...CARD} />

      <rect x="146" {...COLUMN} />
      <rect x="152" width="24" {...COLUMN_TITLE} />
      <rect x="152" y="59" height="16" {...CARD} />

      {/* Ổ khóa */}
      <circle
        cx="110"
        cy="84"
        r="30"
        fill="#FFFFFF"
        stroke="#0C66E4"
        strokeWidth="2"
      />
      <path
        d="M101 81V76C101 71.0294 105.029 67 110 67C114.971 67 119 71.0294 119 76V81"
        stroke="#0C66E4"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect
        x="97"
        y="81"
        width="26"
        height="19"
        rx="4"
        fill="#E9F2FF"
        stroke="#0C66E4"
        strokeWidth="2"
      />
      <circle cx="110" cy="89.5" r="2.2" fill="#0C66E4" />
      <line
        x1="110"
        y1="91.5"
        x2="110"
        y2="95"
        stroke="#0C66E4"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
