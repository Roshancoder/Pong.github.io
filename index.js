let userpaddle = document.getElementById("userpaddle");
let aipaddle = document.getElementById("aipaddle");
let ball = document.getElementById("ball");
let gamebox = document.getElementById("gamebox");
let zpress = false;
let xpress = false;
let vx = -5;
let vy = -5;
let v = Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2));
let userscore = document.getElementById("userscore");
let aiscore = document.getElementById("aiscore");







document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);
function keyDownHandler(e){
    if(e.key =='z'){
        zpress = true;
    }
    else if(e.key == 'x'){
        xpress = true;
    }
}
function keyUpHandler(e){
    if(e.key =='z'){
        zpress = false;
    }
    else if(e.key == 'x'){
        xpress = false;
    }
}
function reset(){
    ball.style.left = "50%";
    ball.style.top = "50%";
    vx = -5;
    vy = -5;
    v = Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2));
}


function checkcollision(paddle){
    let balltop = ball.offsetTop;
    let ballbottom = ball.offsetTop+ball.offsetHeight;
    let ballleft = ball.offsetLeft;
    let ballright = ball.offsetLeft+ball.offsetWidth;

    let paddletop = paddle.offsetTop;
    let paddlebottom = paddle.offsetTop+paddle.offsetHeight;
    let paddleleft = paddle.offsetLeft;
    let paddleright = paddle.offsetLeft + paddle.offsetWidth;


    if(ballbottom>paddletop && balltop<paddlebottom && ballright>paddleleft && ballleft<paddleright){
        console.log("collision");
        return true;  
    }
    return false;
}
function gameloop(){
    if(ball.offsetLeft < 0){
        aiscore.innerHTML = parseInt(aiscore.innerHTML)+1;
        reset();
    }
    if(ball.offsetLeft > gamebox.offsetWidth-ball.offsetWidth){
        userscore.innerHTML = parseInt(userscore.innerHTML)+1;
        reset();
    }
    if(parseInt(aiscore.innerHTML) == 5){
        document.getElementById("win").innerHTML = "AI WON THE GAME";
        setTimeout(function(){
            document.getElementById("win").innerHTML = " ";
        },2000);
        setTimeout(function(){
            window.location.href = window.location.href;
        },2000);
        //reset();
        return;
    }
    if(parseInt(userscore.innerHTML) == 1){
        document.getElementById("win").innerHTML = "YOU WON THE GAME";
        setTimeout(function(){
            document.getElementById("win").innerHTML = " ";
        },2000);
        setTimeout(function(){
            window.location.href = window.location.href;
        },2000);
        //reset();
        return;
    }
    if(ball.offsetTop < 0){
        vy = -vy;
    }
    if(ball.offsetTop > gamebox.offsetHeight-ball.offsetHeight){
        vy = -vy;
    }
    let paddle = ball.offsetLeft<gamebox.offsetWidth/2 ? userpaddle:aipaddle;
    let ballcentery= ball.offsetTop+ball.offsetHeight/2;
    let paddlecentery= paddle.offsetTop+paddle.offsetHeight/2;
    let angle = 0;
    if(checkcollision(paddle)){
        if(paddle == userpaddle){
            if(ballcentery<paddlecentery){
                angle = -Math.PI/4;
            }
            else if(ballcentery == paddlecentery){
                angle = 0;
            }
            else if(ballcentery>paddlecentery){
                angle = Math.PI/4;
            }
        }
        else if(paddle == aipaddle){
            if(ballcentery<paddlecentery){
                angle = -3*Math.PI/4;
            }
            else if(ballcentery == paddlecentery){
                angle = 0;
            }
            else if(ballcentery>paddlecentery){
                angle = 3*Math.PI/4;
            }
        }
        v = v+2;
        vx = v*Math.cos(angle);
        vy = v*Math.sin(angle);
    }
    //console.log(angle)
    let aidelay = 0.8;
    aipaddle.style.top = aipaddle.offsetTop+(ball.offsetTop-aipaddle.offsetTop-aipaddle.offsetHeight/2)*aidelay + "px";

    ball.style.left = ball.offsetLeft + vx + "px";
    ball.style.top = ball.offsetTop + vy + "px";
    if(zpress && userpaddle.offsetTop>55){
        userpaddle.style.top = userpaddle.offsetTop-7+"px";
    }
    if(xpress && userpaddle.offsetTop<gamebox.offsetHeight-userpaddle.offsetHeight+45){
        userpaddle.style.top = userpaddle.offsetTop+7+"px";
    }
    requestAnimationFrame(gameloop);
}
gameloop();

