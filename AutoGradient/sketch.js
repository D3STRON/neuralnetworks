function targetFunction(x1, x2, x3) {
    return Math.sin(x1) + Math.pow(x2, 2) - Math.log(1 + Math.abs(x3));
}

// Function to generate synthetic data using the target function
function generateLearnableDataset(num_samples, num_features= 3) {
    const data = [];
    const labels = [];

    for (let i = 0; i < num_samples; i++) {
        // Generate random input vector of size num_features
        let input = Array.from({ length: num_features }, () => Math.random() * 2 - 1);

        // Apply the target function to generate the label
        let labelValue = targetFunction(input[0], input[1], input[2]);
        let label = new Value(labelValue);  // Wrapping in the Value class

        // Convert the input to Value objects for the neural network
        let inputValues = input.map(val => new Value(val));

        data.push(inputValues);
        labels.push(label);
    }

    return { data, labels };
}

function train(num_samples, layer_sizes = [4, 5 ,1], lr = 0.005, iterations = 1000) {
    const {data, labels} = generateLearnableDataset(num_samples)
    console.log(data)
    var model = new MLP(data[0].length, layer_sizes)

    for(let i =0; i < iterations; i++) {
        let outputs = Array.from({ length: data.length }, (_, i) => (model.forward(data[i])));
        let loss = outputs.reduce((sum, output, i) => sum.add(output.sub(labels[i]).pow(2)), new Value(0));
        
        
        model.zero_grad()
        loss.backward()
        var parameters = model.parameters()
        parameters.forEach(parameter => {
            parameter.data += -lr * parameter.grad;
        });
        if (i %20 == 0) {
            console.log(i, loss.data)
        }
    }
}