noseX = 0;
noseY = 0;

difference = 0;
leftWristX = 0;
rightWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    background('#FFA500');
    fill('#F90093');
    document.getElementById("square_sides").innerHTML = "Width and Height of the Square will be: " + difference + "px";
    stroke('#F90093');
    square(noseX, noseY, difference);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        console.log("Nose X:" + noseX + ", Nose Y:" + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        
        difference = floor(leftWristX - rightWristX);

        console.log("Left Wrist X:" + leftWristX + ", Right Wrist X:" + rightWristX + ", Difference:" + difference);
    }
}