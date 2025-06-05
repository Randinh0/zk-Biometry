const circomlibjs = require('circomlibjs');

(async () => {
  const poseidon = await circomlibjs.buildPoseidon();
  const arr = [1n, 2n, 3n];
  const hash = poseidon(arr);
  // El resultado es un BigInt, conviértelo a string decimal:
  console.log(poseidon.F.toString(hash));
})();