pragma circom 2.1.4;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/comparators.circom";

template FacescannerVerify(N) {
    signal input faceTemplate[N];
    signal input expectedHash;
    signal output out;

    component poseidon = Poseidon(N);

    for (var i = 0; i < N; i++) {
        poseidon.inputs[i] <== faceTemplate[i];
    }

    component isEq = IsEqual();
    isEq.in[0] <== poseidon.out;
    isEq.in[1] <== expectedHash;

    out <== isEq.out;
}

component main = FacescannerVerify(3);