let inputDir = { x: 0, y: 0 };
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 11 }];
food = { x: 15, y: 13};let a = 2;
let b = 18;
food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if ((ctime - lastPaintTime)/1000 < 1/speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake){
    //if snake touch itself
    for(let i = 1; i<snakeArr.length; i++){
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
      }
    }

    //if snake touch the wall
    if(snake[0].x >= 20 ||snake[0].x <= 0 || snake[0].y>= 20 || snake[0].y <= 0){
      return true;
    }
    return false;

}

function gameEngine() {
  // updating the snake and food
  if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("game over, press any key to replay the game");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    //   if you have eaten food and update the food
   if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
       score += 1
       if(score>hisscoreval){
         hisscoreval = score;
         localStorage.setItem("hiscore", JSON.stringify(hisscoreval));
         hisscrbox.innerHTML = "hi score: " + hisscoreval;
       }
       scoreBox.innerHTML = "score: " + score;
       snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y: snakeArr[0].y + inputDir.y})
       food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

   // moving the snake
   for (let i = snakeArr.length - 2; i>=0; i--){
    //    const element = array[i]
       snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

  // display the snake and food
  board.innerHTML = "";
  // display the snake
  snakeArr.forEach((e, index) => {
    snakElement = document.createElement("div");
    snakElement.style.gridRowStart = e.y;
    snakElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakElement.classList.add("head");
    } else {
      snakElement.classList.add("snake");
    }
    board.appendChild(snakElement);
  });
  // display food element
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//  main logic staets here
let hisscore = localStorage.getItem("hisscore");
if(hisscore === null){
  hisscoreval = 0;
  localStorage.setItem("hisscore", JSON.stringify(hisscoreval))
}else{
  hisscoreval = JSON.parse(hisscore);
  hisscrbox.innerHTML = "hi score: " + hisscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1}; //game starts
  switch (e.key) {
    case "ArrowUp":
      // console.log("ArrowUP");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      // console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      // console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      // console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
