function textMatchesLoosely(e, n) {
  return e !== "" && (e === n || e.includes(n) || n.includes(e));
}

function mbtiStyleLine(e, n, s) {
  const a = mbtiOf(e),
    o = MBTI_STYLE_LINES[a],
    l = hashString(`${e}|${s ?? ""}|${n}`),
    c = o.starters[l % o.starters.length] ?? "",
    u = o.closers[(l >>> 3) % o.closers.length] ?? "",
    f = SENTENCE_END_RE.test(n) ? n : `${n}。`;
  if (!s) {
    let j = l % 5;
    return (
      j >= 4 && textMatchesLoosely(c, u) && (j = 0),
      j <= 1 ? `${c}${f}` : j <= 3 ? `${f}${u}` : `${c}${f}${u}`
    );
  }
  const g = BUSY_LINES[s],
    x = g.starters[l % g.starters.length] ?? "",
    m = g.closers[(l >>> 1) % g.closers.length] ?? "",
    p = l % 6;
  if (p === 0) return `${x}${f}`;
  if (p === 1) return `${f}${m}`;
  if (p === 2) {
    const j = textMatchesLoosely(x, u) ? "" : u;
    return `${x}${f}${j}`;
  }
  if (p === 3) {
    const j = textMatchesLoosely(u, m) ? "" : m;
    return `${f}${u}${j}`;
  }
  if (p === 4) return `${textMatchesLoosely(c, m) ? "" : c}${f}${m}`;
  const y = textMatchesLoosely(m, u) ? "" : u;
  return `${f}${m}${y}`;
}
