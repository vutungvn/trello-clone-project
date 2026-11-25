/** "Trần Thị Đào" → "tran thi dao" */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replaceAll("đ", "d");
}

/** Tìm không phân biệt hoa thường và dấu: gõ "tran" ra "Trần" */
export function matchesKeyword(text: string, keyword: string): boolean {
  return normalize(text).includes(normalize(keyword.trim()));
}

export function isEmail(text: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
}
