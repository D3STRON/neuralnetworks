function init()
{
    let nn = new NeuralNetwork(2,3,1)
    let input=[1,0]
    let guess= nn.feedforward(input)
    console.log(guess)
}