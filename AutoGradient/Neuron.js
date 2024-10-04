class Neuron{
    constructor(num_in) {
        this.weights = Array.from({ length: num_in }, () => new Value(Math.random() * 2 - 1));
        this.bias = new Value(Math.random() * 2 - 1)
    }
    
    parameters(){
        let params_list = this.weights.concat([this.bias]);
        return params_list;
    }

    zero_grad() {
        this.weights.forEach(weight => {
            weight.grad = 0
        });

        this.bias.grad = 0
    }
    
    forward(x) {
        if (x.length !== this.weights.length) {
            throw new Error('Input vector length must match the number of neuron weights.');
        }
        let result = this.weights.reduce((sum, weight, i) => sum.add(weight.mul(x[i])), this.bias);
        return result;
    }
}
