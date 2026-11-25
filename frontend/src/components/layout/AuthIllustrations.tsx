const ILLUSTRATION_CLASS =
  "pointer-events-none absolute bottom-0 hidden select-none lg:block";

/** Hai hình minh họa ở góc dưới của trang đăng nhập, đăng ký và lời mời */
export function AuthIllustrations() {
  return (
    <>
      <svg
        width="340"
        height="280"
        viewBox="0 0 340 280"
        fill="none"
        aria-hidden="true"
        className={`${ILLUSTRATION_CLASS} left-0`}
      >
        <ellipse cx="160" cy="272" rx="145" ry="18" fill="#E9F2FF" />
        {/* Bảng Kanban */}
        <rect
          x="36"
          y="48"
          width="210"
          height="150"
          rx="10"
          fill="#FFFFFF"
          stroke="#DFE1E6"
          strokeWidth="2"
        />
        <rect x="48" y="64" width="56" height="118" rx="6" fill="#F1F2F4" />
        <rect x="113" y="64" width="56" height="118" rx="6" fill="#F1F2F4" />
        <rect x="178" y="64" width="56" height="118" rx="6" fill="#F1F2F4" />
        {/* Thẻ */}
        <rect x="54" y="74" width="44" height="24" rx="4" fill="#579DFF" />
        <rect x="54" y="104" width="44" height="20" rx="4" fill="#FFFFFF" />
        <rect x="60" y="110" width="24" height="4" rx="2" fill="#6CC3E0" />
        <rect x="119" y="74" width="44" height="28" rx="4" fill="#F5CD47" />
        <rect x="119" y="108" width="44" height="22" rx="4" fill="#FFFFFF" />
        <rect x="184" y="74" width="44" height="24" rx="4" fill="#4BCE97" />
        {/* Người đang đặt thẻ */}
        <circle cx="248" cy="128" r="16" fill="#F5CD47" />
        <path
          d="M234 124C234 114 242 108 252 109C260 110 264 116 264 124C256 120 242 120 234 124Z"
          fill="#172B4D"
        />
        <path
          d="M226 156C226 146 235 142 248 142C261 142 270 148 270 160V212H226V156Z"
          fill="#0C66E4"
        />
        <path
          d="M228 156L192 124"
          stroke="#0C66E4"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <rect
          x="166"
          y="108"
          width="34"
          height="22"
          rx="4"
          transform="rotate(-8 166 108)"
          fill="#6CC3E0"
        />
        <rect x="230" y="212" width="15" height="54" rx="6" fill="#172B4D" />
        <rect x="251" y="212" width="15" height="54" rx="6" fill="#172B4D" />
        {/* Chậu cây */}
        <rect x="28" y="226" width="26" height="36" rx="4" fill="#6CC3E0" />
        <path
          d="M41 226C31 206 20 198 18 184C30 186 40 200 41 226Z"
          fill="#1F845A"
        />
        <path
          d="M41 226C51 202 64 196 66 182C54 184 44 198 41 226Z"
          fill="#4BCE97"
        />
      </svg>

      <svg
        width="340"
        height="280"
        viewBox="0 0 340 280"
        fill="none"
        aria-hidden="true"
        className={`${ILLUSTRATION_CLASS} right-0`}
      >
        <ellipse cx="180" cy="272" rx="145" ry="18" fill="#E9F2FF" />
        {/* Cột thẻ */}
        <rect
          x="130"
          y="54"
          width="174"
          height="148"
          rx="10"
          fill="#FFFFFF"
          stroke="#DFE1E6"
          strokeWidth="2"
        />
        <rect x="146" y="72" width="142" height="32" rx="5" fill="#E9F2FF" />
        <rect x="156" y="82" width="44" height="6" rx="3" fill="#0C66E4" />
        <rect x="156" y="92" width="88" height="4" rx="2" fill="#579DFF" />
        <circle cx="268" cy="88" r="8" fill="#F5CD47" />
        <rect x="146" y="114" width="142" height="32" rx="5" fill="#F1F2F4" />
        <rect x="156" y="124" width="52" height="6" rx="3" fill="#1F845A" />
        <rect x="156" y="134" width="76" height="4" rx="2" fill="#8590A2" />
        <rect x="146" y="156" width="142" height="32" rx="5" fill="#F1F2F4" />
        <rect x="156" y="166" width="38" height="6" rx="3" fill="#F5CD47" />
        {/* Người đang kiểm tra thẻ */}
        <circle cx="92" cy="120" r="16" fill="#F5CD47" />
        <path
          d="M76 116C78 104 88 100 98 102C106 104 110 112 108 120C100 114 84 114 76 116Z"
          fill="#172B4D"
        />
        <path
          d="M70 150C70 140 80 136 92 136C104 136 114 142 114 152V212H70V150Z"
          fill="#0F6D78"
        />
        <path
          d="M112 152L146 134"
          stroke="#0F6D78"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <circle cx="152" cy="130" r="9" fill="#4BCE97" />
        <path
          d="M148 130L151 133L157 127"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="74" y="212" width="15" height="54" rx="6" fill="#172B4D" />
        <rect x="95" y="212" width="15" height="54" rx="6" fill="#172B4D" />
      </svg>
    </>
  );
}
