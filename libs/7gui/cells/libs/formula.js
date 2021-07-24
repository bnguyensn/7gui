export function parseFormulaText(str) {
  if (!str.startsWith('=')) {
    throw new Error(`Text ${str} is not a formula`);
  }

  const splitByOperators = str.split(/[+\-*/]/g);
}
