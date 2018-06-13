
class NeuralNetwork{
    constructor(numI, numH, numO)
    {
        this.input_nodes=numI 
        this.hidden_nodes=numH
        this.output_nodes=numO
        this.weight_ih= new Matrix(this.hidden_nodes,this.input_nodes)// the list of weights between input nodes and hidden nodes in this adjacency matrix
        this.weight_ih.randomize()// all weights will be random to begin with
        this.weight_ho=new Matrix(this.output_nodes,this.hidden_nodes)//the list of weights between hidden nodes and output nodes in this adjacency matrix
        this.weight_ho.randomize()
        this.bias_h= new Matrix(this.hidden_nodes,1)
        this.bias_h.randomize()
        this.bias_o=new Matrix(this.output_nodes,1)
        this.bias_o.randomize()
    }

    feedforward(input_array)
    {
        let inputs = Matrix.fromArray(input_array)// converting input array to a object of Matrix class to perfomr Matrix operations
        let hidden= Matrix.multiply(this.weight_ih,inputs)
        hidden.add(this.bias_h)//output of the weighted sum plus bias
        hidden.map(sigmoid)// finally pass that outputs at every hidden node through the activation function to get the hidden layers final output
        
        let output=Matrix.multiply(this.weight_ho,hidden)//simialar for the final output layer for which the hidden layer is the input
        output.add(this.bias_o)
        output.map(sigmoid)

        return output.toArray()
    }
}

function sigmoid(x)
{
    return 1/(1+Math.exp(-x))
}