function isFormula(absoluteVal) {
  const REGEX = /^=/i;

  return REGEX.test(absoluteVal);
}

function computeValue(absoluteVal) {
  // somehow compute value
  // ...

  return absoluteVal;
}

/**
 * Re-compute a cell's value. Other cells dependent on this cell will also have
 * their values re-computed.
 *
 * @param {object} dataRecord - A record of cell content
 * @param {object} dependenciesRecord - A record of cell dependencies
 * @param {string} changedCellId - The current cell's ID
 * @parms {string} newContent - The new content of the current cell
 */
export default function recomputeCell({
  dataRecord,
  dependenciesRecord,
  changedCellId,
  newContent,
}) {
  // Re-compute the changed cell's values

  const { absoluteVal } = dataRecord[changedCellId];

  if (isFormula(newContent)) {
    dataRecord[changedCellId] = {
      absoluteVal: newContent,
      computedVal: computeValue(absoluteVal),
    };
  } else {
    dataRecord[changedCellId] = {
      absoluteVal: newContent,
      computedVal: newContent,
    };
  }

  // There may be other cells depending on it...

  const dependencies = dependenciesRecord[changedCellId];

  if (dependencies) {
    dependencies.forEach((dependency) => {
      // ...
    });
  }
}
