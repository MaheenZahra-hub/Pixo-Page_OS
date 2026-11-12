export function simulateFIFO(pages, frameCount) {
  const frames = [];
  const arrivalStep = {};
  const steps = [];
  let hits = 0;
  let faults = 0;

  pages.forEach((page, idx) => {
    const isHit = frames.includes(page);
    let evicted = null;
    let targetIndex = -1;
    let reason = '';

    if (isHit) {
      hits++;
      targetIndex = frames.indexOf(page);
      reason = `HIT: Page ${page} is already loaded in Slot ${targetIndex} (arrived at Step #${arrivalStep[page]}).`;
    } else {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
        targetIndex = frames.length - 1;
        arrivalStep[page] = idx + 1;
        reason = `FAULT: Free memory available. Loaded Page ${page} into empty Slot ${targetIndex}.`;
      } else {
        const oldestPage = frames[0];
        const loadedAt = arrivalStep[oldestPage];
        evicted = frames.shift();
        delete arrivalStep[evicted];
        frames.push(page);
        targetIndex = frames.length - 1;
        arrivalStep[page] = idx + 1;
        reason = `FAULT: Memory full. FIFO queue head Page ${evicted} (loaded earliest at Step #${loadedAt}) was evicted for Page ${page}.`;
      }
    }
    steps.push({
      stepNumber: idx + 1,
      page,
      frames: [...frames],
      isHit,
      evicted,
      targetIndex,
      reason,
    });
  });
  return { steps, hits, faults, total: pages.length };
}

export function simulateLRU(pages, frameCount) {
  const frames = [];
  const steps = [];
  let hits = 0;
  let faults = 0;

  pages.forEach((page, idx) => {
    const isHit = frames.includes(page);
    let evicted = null;
    let targetIndex = -1;
    let reason = '';

    if (isHit) {
      hits++;
      targetIndex = frames.indexOf(page);
      reason = `HIT: Page ${page} found in Slot ${targetIndex}. Recency timestamp refreshed to Step #${idx + 1}.`;
    } else {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
        targetIndex = frames.length - 1;
        reason = `FAULT: Free memory available. Loaded Page ${page} into empty Slot ${targetIndex}.`;
      } else {
        let lruPageIndex = -1;
        let oldestAccess = Infinity;
        for (let f = 0; f < frames.length; f++) {
          const framePage = frames[f];
          let lastSeen = -1;
          for (let p = idx - 1; p >= 0; p--) {
            if (pages[p] === framePage) {
              lastSeen = p;
              break;
            }
          }
          if (lastSeen < oldestAccess) {
            oldestAccess = lastSeen;
            lruPageIndex = f;
          }
        }
        evicted = frames[lruPageIndex];
        frames[lruPageIndex] = page;
        targetIndex = lruPageIndex;
        reason = `FAULT: Memory full. Backward scan found Page ${evicted} was least recently used (last seen at Step #${oldestAccess + 1}) → Replaced in Slot ${targetIndex}.`;
      }
    }
    steps.push({
      stepNumber: idx + 1,
      page,
      frames: [...frames],
      isHit,
      evicted,
      targetIndex,
      reason,
    });
  });
  return { steps, hits, faults, total: pages.length };
}

export function simulateOptimal(pages, frameCount) {
  const frames = [];
  const steps = [];
  let hits = 0;
  let faults = 0;

  pages.forEach((page, idx) => {
    const isHit = frames.includes(page);
    let evicted = null;
    let targetIndex = -1;
    let reason = '';

    if (isHit) {
      hits++;
      targetIndex = frames.indexOf(page);
      reason = `HIT: Page ${page} is already in Slot ${targetIndex}. No replacement needed.`;
    } else {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
        targetIndex = frames.length - 1;
        reason = `FAULT: Free memory available. Loaded Page ${page} into empty Slot ${targetIndex}.`;
      } else {
        let optimalIndex = -1;
        let furthestNextUse = -1;
        for (let f = 0; f < frames.length; f++) {
          const framePage = frames[f];
          let nextUse = Infinity;
          for (let p = idx + 1; p < pages.length; p++) {
            if (pages[p] === framePage) {
              nextUse = p;
              break;
            }
          }
          if (nextUse > furthestNextUse) {
            furthestNextUse = nextUse;
            optimalIndex = f;
          }
        }
        evicted = frames[optimalIndex];
        frames[optimalIndex] = page;
        targetIndex = optimalIndex;
        const futureNote =
          furthestNextUse === Infinity
            ? `Page ${evicted} is never referenced again`
            : `Page ${evicted} isn't needed until Step #${furthestNextUse + 1}`;
        reason = `FAULT: Memory full. Future lookahead shows ${futureNote} → Evicted from Slot ${targetIndex}.`;
      }
    }
    steps.push({
      stepNumber: idx + 1,
      page,
      frames: [...frames],
      isHit,
      evicted,
      targetIndex,
      reason,
    });
  });
  return { steps, hits, faults, total: pages.length };
}