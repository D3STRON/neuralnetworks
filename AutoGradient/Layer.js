class Layer {
    constructor(num_in, num_o, act_func) {
        this.num_in = num_in
        this.neurons = Array.from({ length: num_o }, () => new Neuron(num_in));
        this.act_func = Array.from({ length: num_o }, () => new Activation(act_func));
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
        var logits = this.neurons.map(neuron => neuron.forward(x));
        const outs = Array.from({ length: this.act_func.length }, (_, i) => (this.act_func[i].activate(logits[i])));
        return outs
    }
}