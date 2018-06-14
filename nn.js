
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
        this.learning_rate= 0.01
    }

    feedforward(input_array)
    {
        this.inputs = Matrix.fromArray(input_array)// converting input array to a object of Matrix class to perfomr Matrix operations
        
        this.hidden= Matrix.multiply(this.weight_ih,this.inputs)
        this.hidden.add(this.bias_h)//output of the weighted sum plus bias
        this.hidden.map(sigmoid)// finally pass that outputs at every hidden node through the activation function to get the hidden layers final output
        
        let output=Matrix.multiply(this.weight_ho,this.hidden)//simialar for the final output layer for which the hidden layer is the input
        output.add(this.bias_o)
        output.map(sigmoid)

        return output
    }

    train(input_array,target_array)
    {
        let outputs=this.feedforward(input_array)
        let targets=Matrix.fromArray(target_array)
        let output_errors = Matrix.subract(targets,outputs)//error to determine cost function
        console.log(output_errors.data[0][0]*output_errors.data[0][0])

        //Calculate gradient for hidden to output
        let gradients= Matrix.map(outputs,dsigmoid)// derivative for activation function output elements are now oi(1+oi)
        gradients.multiply(output_errors)//this if for deltas_weight_ho which is the required change in Weights between output layer and hidden layer
        gradients.multiply(this.learning_rate)// multiplying every element with learning rate
        
        //Calculate deltas for hidden to output
        let hidden_t= Matrix.transpose(this.hidden)
        let deltas_weight_ho= Matrix.multiply(gradients,hidden_t)
        
        this.weight_ho.add(deltas_weight_ho)// finally adjusting the weights
        this.bias_o.add(gradients)          // finally adjusting biases of output layer

        let hidden_error= Matrix.multiply(Matrix.transpose(this.weight_ho),output_errors)// this matrix is the error of the hidden layer 
        
        //Claculate gradient for input layer to hidden 
        let hidden_gradients= Matrix.map(this.hidden,dsigmoid)
        hidden_gradients.multiply(hidden_error)
        hidden_gradients.multiply(this.learning_rate)

        //Caluclate deltas for input layer to hidden 
        let inputs_t= Matrix.transpose(this.inputs)
        let deltas_weight_ih=Matrix.multiply(hidden_gradients,inputs_t)
         
        this.weight_ih.add(deltas_weight_ih)// finally adjusting the weights
        this.bias_h.add(hidden_gradients)   // finally adjusting biases for hidden layer

        return hidden_error
    }
}

function sigmoid(x)
{
    return 1/(1+Math.exp(-x))
}

function dsigmoid(y)
{
    return y/(1+y)
}

function square(x)
{
    return x*x
}