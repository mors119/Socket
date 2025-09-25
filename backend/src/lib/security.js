// 안전한 문자 이스케이프 (텍스트/속성 공통)
export function escapeHTML(input) {
  const s = String(input ?? '');
  // 보안상 불필요한 제어문자 제거(이메일 클라이언트 호환 고려)
  const withoutCtl = s.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
  // Bidi override 문자 제거
  const withoutBidi = withoutCtl.replace(/[\u202A-\u202E\u2066-\u2069]/g, '');
  return withoutBidi
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;') // 태그 주입 방지
    .replace(/>/g, '&gt;') // 태그 주입 방지
    .replace(/"/g, '&quot;') // 속성값 안전
    .replace(/'/g, '&#39;') // 속성값 안전
    .replace(/\//g, '&#x2F;');
}

// URL 검증 + 정규화
export function sanitizeUrl(urlLike, opts = { allowHttp: false }) {
  try {
    const url = new URL(String(urlLike));
    // 허용 프로토콜만 통과
    const allowed = new Set(['https:', ...(opts.allowHttp ? ['http:'] : [])]);
    if (!allowed.has(url.protocol)) throw new Error('blocked protocol');
    // 메일클라이언트에서 JS 스킴/데이터 URI 차단
    // 쿼리/해시 내의 잠재적 HTML은 렌더 되지 않지만 그래도 이스케이프
    const safeHref = url.toString();
    return escapeHTML(safeHref);
  } catch {
    return '#'; // 실패 시 안전한 기본값
  }
}
