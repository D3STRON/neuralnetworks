
class Layer {
    constructor(num_in, num_o) {
        this.num_in = num_in
        this.neurons = Array.from({ length: num_o }, () => new Neuron(num_in));
    }
    
    parameters() {
        return this.neurons.flatMap(neuron => neuron.parameters());
    }
    
    zero_grad() {
        this.neurons.forEach(neuron => {
            neuron.zero_grad()
        });
    }

    forward(x) {
        const outs = this.neurons.map(neuron => neuron.forward(x));
        return outs
    }
}