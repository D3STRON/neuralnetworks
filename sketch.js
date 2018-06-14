let training_data=[
    {
       inputs:[0,0],
       targets:[0]
    },
    {
       inputs:[1,1],
       targets:[0]
    },
    {
       inputs:[0,1],
       targets:[1]
    },
    {
       inputs:[1,0],
       targets:[1]
    }
]
function init()
{

    let nn = new NeuralNetwork(2,2,1)
    for(let i=0;i<500000;i++)
    {
        let data= training_data[Math.floor(Math.random() * training_data.length)];
        //for(data of training_data){
            nn.train(data.inputs,data.targets)
        //}
    }

    console.log(nn.feedforward([0,0]).toArray())//0
    console.log(nn.feedforward([1,1]).toArray())//0
    console.log(nn.feedforward([0,1]).toArray())//1
    console.log(nn.feedforward([1,0]).toArray())//1

}