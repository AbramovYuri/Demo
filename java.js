let scrollerText = document.querySelector('.scroller-text').innerHTML;
let scrollLetterCount = 70;
let curentLetter = 0;
let sinusCount = 0;
let cosCount = 0;
let pi = 2 * Math.PI;
let screenHeight = document.querySelector('.demo-screen').offsetHeight;
let scrollLeft = 0;
let scrollDelay = 4;
let screenWidth = document.querySelector('.demo-screen').offsetWidth;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth, canvasHeight;
let mX = 0;
let mY = 0;
let pointCoord = [];
let starsCount = 300;
let deepStars = 3000;
let starsSpeed = 10;
let k = 3000;
let pointDistance = 150;
let pointDistance3D = 500;


addEventListener('resize', resize);
addEventListener('orientationchange', resize);


resize();
pointGenerator();
pointSet();





generateHtmlLetterScroller();

let letter = document.querySelectorAll('.letter');
window.onload = mainLoop();
document.querySelector('.demo-screen').addEventListener('click', mainLoop);

function mainLoop() {
    flyingScroller();
    mainLoop2();
    requestAnimationFrame(mainLoop);
}

function flyingScroller() {
    scrollLeft +=3;

    let sinusCountSave = sinusCount;
    let test = 0;
    let sin,cos;
    for (let i = 0; i < curentLetter + scrollLetterCount; i++) {
        if (i >= curentLetter && i <= curentLetter + scrollLetterCount) {
            sin = Math.sin(sinusCount);
            cos = Math.cos(cosCount);
            letter[i].style.left = Math.floor(sin * (screenHeight / 10)) + i * 30 - scrollLeft + "px";
            letter[i].style.top = Math.floor(cos*80+screenHeight / 2) + Math.floor(sin * (screenHeight / 10)) + "px";
            // letter[i].style.fontSize = Math.floor(40+sin*sin * 80) + "px";
            letter[i].style.display = "inline-block";
            test++;
        }
        sinusCount += .2;

    }

    if (sinusCountSave <= pi) {
        sinusCount = sinusCountSave + .02;
    } else {
        sinusCount = 0;
    }
    cosCount +=.05;
    if (scrollLeft / 30 === scrollDelay) {
        scrollDelay++;
        letter[curentLetter].style.display = "none";
        curentLetter++;
    }

    console.log(test);
}

function generateHtmlLetterScroller() {
    for (let i = 0; i < scrollerText.length; i++) {
        document.querySelector('.demo-screen').insertAdjacentHTML('afterEnd', '<span class="letter"></span>');

    }

    for (let i = 0; i < scrollerText.length; i++) {
        document.getElementsByClassName('letter')[i].innerHTML = scrollerText[i];
    }
}


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/*
document.querySelector('.universe').onmousemove = function (event) {
        mX = (canvasWidth / 2 - event.clientX)/2;
        mY = (canvasHeight / 2 - event.clientY)/2;
};*/



function mainLoop2() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    pointSet();
   // lineDraw();
    pointMove();

}


function pointGenerator() {
    let x, y, z, s;
    for (let i = 0; i < starsCount; i++) {
        x = Math.random() * canvasWidth - canvasWidth / 2;
        y = Math.random() * canvasHeight - canvasHeight / 2;
        z = Math.random() * (deepStars + k);
        s = Math.random() * starsSpeed + 1;
        pointCoord[i] = [x, y, z, s];
    }
}

function pointSet() {


    let circle = 2 * Math.PI;
    ctx.fillStyle = '#d0d0d0';
    for (let i = 0; i < starsCount; i++) {
        let p = pointCoord[i][2];
        let x = (k * pointCoord[i][0]) / (p + k) + canvasWidth / 2 + 1000;
        let y = (k * pointCoord[i][1]) / (p + k) + canvasHeight / 2 ;
        let r = (deepStars - p) / deepStars * 1.5;
        if (r > .2) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, circle);
            ctx.fill();
        }

    }

}

function pointMove() {
    for (let i = 0; i < starsCount; i++) {

        if (pointCoord[i][2] > -k) {
            pointCoord[i][2] -= pointCoord[i][3];
        }
        else {
            pointCoord[i][2] = deepStars;
        }

    }
}

function resize() {
    let universeDiv = document.getElementsByClassName("universe");
    canvasWidth = universeDiv[0].offsetWidth;
    canvasHeight = universeDiv[0].offsetHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    starsCount = canvasWidth*canvasHeight/6000;            //  количество звезд автоматически
    console.log(starsCount);
    pointGenerator();
}

function lineDraw() {
    let vector, xCord, yCord, zCord;

    for (let i = 0; i < starsCount - 1; i++) {

        let x = pointCoord[i][0];
        let y = pointCoord[i][1];
        let z = pointCoord[i][2];

        for (let q = 1; q < starsCount/6; q++) {

            xCord = Math.abs(x - pointCoord[q][0]);
            yCord = Math.abs(y - pointCoord[q][1]);
            zCord = Math.abs(z - pointCoord[q][2]);

            vector = Math.sqrt((xCord * xCord) + (yCord * yCord) + (zCord * zCord));

            if (vector > 5 && vector < pointDistance3D) {
                let p = pointCoord[i][2];
                let x = (k * pointCoord[i][0]) / (p + k) + canvasWidth / 2 + mX;
                let y = (k * pointCoord[i][1]) / (p + k) + canvasHeight / 2 + mY;

                let p2 = pointCoord[q][2];
                let x2 = (k * pointCoord[q][0]) / (p2 + k) + canvasWidth / 2 + mX;
                let y2 = (k * pointCoord[q][1]) / (p2 + k) + canvasHeight / 2 + mY;

                xCord = Math.abs(x - x2);
                yCord = Math.abs(y - y2);

                vector = Math.sqrt((xCord * xCord) + (yCord * yCord));

                if (vector > 5 && vector < pointDistance) {

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(200,200,200,' + ((1 - vector / pointDistance) / 4) + ')';
                    ctx.moveTo(x, y);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }


        }
    }

}