class MLP {
    constructor(num_in, layer_sizes) {
        this.layers = [];
        this.layers.push(new Layer(num_in, layer_sizes[0]));

        for (let i = 1; i < layer_sizes.length; i++) {
            this.layers.push(new Layer(layer_sizes[i - 1], layer_sizes[i]));
        }
    }
    
    parameters() {
        return this.layers.flatMap(layer => layer.parameters());
    }

    zero_grad()
    {
        this.layers.forEach(layer => {
            layer.zero_grad();
        });
    }
    
    forward(x) {
        let out = x;
        for (let layer of this.layers) {
            out = layer.forward(out);
        }
        if(out.length == 1) {
            return out[0]
        }
        return out;
    }
}