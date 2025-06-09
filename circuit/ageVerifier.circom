pragma circom 2.1.4;

include "../node_modules/circomlib/circuits/comparators.circom";



template CheckThreshold() {
    // Señales de entrada
    signal input privateValue;
    signal input threshold;
    
    // Señal de salida booleana
    signal output isAboveThreshold;

    // Componente de comparación (usamos 32 bits por defecto)
    component gt = GreaterThan(32);
    
    // Conectar las entradas
    gt.in[0] <== privateValue;
    gt.in[1] <== threshold;
    
    // Conectar la salida
    isAboveThreshold <== gt.out;
}

// Instancia principal del circuito
component main {public [threshold]} = CheckThreshold();