{
  const row = +new URL(document.currentScript.src).searchParams.get('row');
  [...PIXEL_ROWS[row]].forEach((bit, col) => {
    if (bit !== '1') return;
    const start = PIXEL_T0 + col * PIXEL_MS;
    // Rows share one JS thread, so stagger the timers 2ms within a column to avoid queueing behind each other.
    setTimeout(() => {}, start + row * 2 - performance.now());
    // Chrome draws this on a custom track per row; Firefox's Marker Chart gives each measure name its own row.
    performance.measure(`graffiti ${row}`, {
      start,
      end: start + PIXEL_MS,
      detail: { devtools: { dataType: 'track-entry', trackGroup: 'Timeline Graffiti', track: `row ${row}`, color: 'primary' } },
    });
  });
}
