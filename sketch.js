var boxPts =[]
var shopeeBills = [];
var notShopeeBills=[];
var testingBills =[];
var cnn;
const shopee = 84;
const notShopee = 32;
const resolution =90;
const testing = 19;

const options = {
    inputs: [resolution,resolution,4],
    task: "imageClassification",
    debug: true
  }

function preload()
{
    for(let i=1; i<=shopee;i++)
    {
        shopeeBills.push(loadImage('http://192.168.29.59:3000/Shopee/Shopee('+i+').png'));
    }
    for(let i=33; i<=38;i++)
    {
        notShopeeBills.push(loadImage('http://192.168.29.59:3000/notShopee/notShopee('+i+').png'));
    }
    for(let i=7; i<=32;i++)
    {
        notShopeeBills.push(loadImage('http://192.168.29.59:3000/notShopee/notShopee('+i+').jpg'));
    }
    for(let i=1;i<=testing;i++)
    {
        testingBills.push(loadImage('http://192.168.29.59:3000/testing/testing('+i+').png'));
    }
    cnn = ml5.neuralNetwork(options);
}

function setup()
{
    createCanvas(1000,1000);
    background(0)
    for(let i=0; i<shopeeBills.length;i++)
    {
        shopeeBills[i].resize(resolution, resolution);
        let input = { image : shopeeBills[i]};
        let target = {label: "Shoppee"};
        cnn.addData(input,target);
    }
    for(let i=0; i<notShopeeBills.length;i++)
    {
        notShopeeBills[i].resize(resolution, resolution);
        let input = { image : notShopeeBills[i]};
        let target = {label: "notShoppee"};
        cnn.addData(input,target);
    }
    cnn.normalizeData();
    cnn.train({epochs:70}, finishedTraining);
}

function classify()
{
    for(let i=0;i<testingBills.length;i++)
    {
        testingBills[i].resize(resolution,resolution);
        let input = { image : testingBills[i]};
        cnn.classify(input,handleResults);
    }
}

function handleResults(error, result) {
    if(error){
      console.error(error);
      return;
    }
    console.log(result); // {label: 'red', confidence: 0.8};
}


function finishedTraining()
{
    console.log('finished training!')
}

function init()
{

    let training_data=[
        {
           inputs:[0,0],
           targets:[0]
        },
        {
           inputs:[1,1],
           targets:[1]
        },
        {
           inputs:[0,1],
           targets:[0]
        },
        {
           inputs:[1,0],
           targets:[1]
        }
    ]
    
    let nn = new NeuralNetwork([2,2,1])
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

function mouseClicked()
{
    stroke(0);
    ellipse(mouseX,mouseY,5,5);
    if(boxPts.length<2)
    {
        boxPts.push([mouseX,mouseY])
    }
    if(boxPts.length==2){
        makeBox();
        boxPts = [];
    }
}

function makeBox()
{
    console.log(boxPts)
    var x = boxPts[0][0];
    var y = boxPts[0][1];
    var x1 = boxPts[1][0];
    var y1 = boxPts[1][1];
    stroke(0)
    line(x, y, x1, y);
    line(x, y, x, y1);
    line(x,y1,x1,y1);
    line(x1,y,x1,y1);
}