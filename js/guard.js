// Eski (bayat) asenkron sorguların ekranı ezmesini önler. DOM'suzdur.
export function makeLatest() {
  let seq = 0;
  return {
    /** Yeni sorgu başlatır; dönen token yalnızca en yeni sorgu için current() === true verir. */
    start() {
      const my = ++seq;
      return { current: () => my === seq };
    },
  };
}
