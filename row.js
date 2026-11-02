{
  const row = +new URL(document.currentScript.src).searchParams.get('row');
  [...PIXEL_ROWS[row]].forEach((bit, col) => {
    if (bit !== '1') return;
    // Rows share one JS thread, so stagger them 2ms within a column to avoid queueing behind each other.
    const at = PIXEL_T0 + col * PIXEL_MS + row * 2;
    setTimeout(() => {}, at - performance.now());
    // Chrome draws this on a custom track per row; Firefox's Marker Chart gives each measure name its own row.
    performance.measure(`graffiti ${row}`, {
      start: at,
      end: at + PIXEL_MS * 0.6,
      detail: { devtools: { dataType: 'track-entry', trackGroup: 'Timeline Graffiti', track: `row ${row}`, color: 'primary' } },
    });
  });
}
