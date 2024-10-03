var boxPts =[]
var trainingPts = [];
var shopeeBills = [];
var notShopeeBills=[];
var testingBills =[];
var currentImage = 0;
const epochs = 60;
var cnn;
var nn;
var objectDetector;
const shopee = 84;
const notShopee = 27;
const resolution =100;
const testing = 19;
const canvasSize = 3000;
const buttonX = canvasSize-1500;
const trainButtonY = 70;
const testButtonY = 500;

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
    for(let i=1; i<=notShopee;i++)
    {
        notShopeeBills.push(loadImage('http://192.168.29.59:3000/notShopee/notShopee('+i+').png'));
    }
    for(let i=1;i<=testing;i++)
    {
        testingBills.push(loadImage('http://192.168.29.59:3000/testing/testing('+i+').png'));
    }
    cnn = ml5.neuralNetwork(options);
    nn = new NeuralNetwork([2,6,5,4])
}

function draw()
{
    
    background(0)
    stroke(color( 255, 0 ,50))
    fill(color( 255, 0 ,50))
    ellipse(buttonX,trainButtonY,70,70);
    stroke(color( 255, 0 ,50))
    fill(color( 50, 255 ,50))
    ellipse(buttonX,testButtonY,70,70);
    image(shopeeBills[currentImage],0,0);
    makeBox(boxPts);
}

function setup()
{
    createCanvas(canvasSize,canvasSize);
}

function train()
{
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

function nntester()
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
    var data = {
        inputs: [],
        targets:[]
    }
    for(let i =0;i<trainingPts.length;i++)
    {
        let width = shopeeBills[i].width;
        let height = shopeeBills[i].height;
        data.inputs.push([width,height])
        data.targets.push([trainingPts[i][0][0]/width, trainingPts[i][0][1]/height, trainingPts[i][1][0]/width, trainingPts[i][1][1]/height]);
    }
    for(let j=0;j<epochs;j++)
    {
        for(let i=0;i<500000;i++)
        {
            let index= Math.floor(Math.random() * trainingPts.length);
            
            nn.train(data.inputs[index],data.targets[index])
        }
        console.log(epochs)
    }
}

function mouseClicked()
{
    
    if(Math.sqrt(Math.pow((mouseX-buttonX),2) + Math.pow((mouseY-trainButtonY),2)) < 35 && currentImage<shopeeBills.length)
    {
        currentImage= trainingPts.length;
        boxPts = [];
    }
    else if(Math.sqrt(Math.pow((mouseX-buttonX),2) + Math.pow((mouseY-testButtonY),2)) < 35 && currentImage<shopeeBills.length)
    {
        currentImage = Math.floor(Math.random() * shopeeBills.length);
        let width = shopeeBills[currentImage].width;
        let height = shopeeBills[currentImage].height;
        var output = nn.feedforward([width,height]).toArray()
        boxPts = [[output[0]*width, output[1]*height],[output[2]*width, output[3]*height]];
    }
    else{
        if(boxPts.length<2)
        {
            boxPts.push([mouseX,mouseY])
        }
        if(boxPts.length==2){
            makeBox(boxPts);
            trainingPts.push(boxPts);
        }
    }
}

function makeBox(pts)
{
    if(pts.length==2)
    {
        var x = pts[0][0];
        var y = pts[0][1];
        var x1 = pts[1][0];
        var y1 = pts[1][1];
        stroke(0)
        line(x, y, x1, y);
        line(x, y, x, y1);
        line(x,y1,x1,y1);
        line(x1,y,x1,y1);
    }
    
    for(let i =0;i<pts.length;i++)
    {
        stroke(0);
        ellipse(pts[i][0],pts[i][1],5,5);
    }
}