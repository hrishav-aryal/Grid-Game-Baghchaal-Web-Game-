var clickHistory = [];
var tigerPos = [];
var lastClickitem;
var turn,gleft;
var gkilled;
var goats = 0;
var checkTigerClick = 0;
var checkGoatClick = 0;

function setup() { //initialize everything
  
  fillFunctionButtons();
  fillMatrix();

}

function fillFunctionButtons() {
  var headDiv = document.getElementById("head");
  var funcBtnRow = createRow();
  funcBtnRow.appendChild(createButton("Play", "btn btn-primary btn-sm m-3", "f1()"));
  funcBtnRow.appendChild(createButton("Reset", "btn btn-warning btn-sm m-3", "f2()"));
  funcBtnRow.appendChild(createButton("One Move back", "btn btn-dark btn-sm m-3", "f3()"));
  headDiv.appendChild(funcBtnRow);
}

function fillStatusText() {
  var headDiv = document.getElementById("head");
  var infoTextRow = createRow("hhh");
  infoTextRow.id = "infoText"; //set id of this element so we can change it later

  headDiv.appendChild(infoTextRow);
  setTextBar(turn, gleft, gkilled);
 
}
function createTextField(fieldText, fieldStyle) {
  var field = document.createElement("button");
  field.className = fieldStyle;
  field.appendChild(document.createTextNode(fieldText));
  return field;
}

function setStatusText(text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("div");
  if (style != null) {
    newText.className = style;
  }
  newText.style.fontSize = "20px";
  newText.appendChild(document.createTextNode(text));
  textDiv.innerHTML = "";
  textDiv.appendChild(newText);
}

function winBanner(winner){
  var hdiv = document.getElementById("head");
  var winRow = createRow("win");
  winRow.style.fontSize = "30px";
  winRow.id = "win_1";

  winRow.appendChild(document.createTextNode(winner));
  hdiv.appendChild(winRow);
}

function fillMatrix() {
  var matrix = document.getElementById("grid");
  var rightCrossIndex = [0,2,6,8,10,12,16,18];
  var leftCrossIndex = [1,3,5,7,11,13,15,17];
  for (i = 0; i < 5; i++) {
    var newRow = createRow("justify-content-md-center");
    var newRow_1 = createRow("justify-content-md-center");
    for (j = 0; j < 5; j++) {
      var checkCrossIndex = i*5 + j;
      newRow.appendChild(createDefaultButton(i, j));
      if(j!=4){
        newRow.appendChild(createHorizontalLines()); 
        if(i!=4){
          newRow_1.appendChild(createVerticalLines()); 
        }
      } else if(i != 4){
        newRow_1.appendChild(createVerticalLines()); 
      }
      
      if(i != 4 && j != 4){
        if(rightCrossIndex.includes(checkCrossIndex)){
          newRow_1.appendChild(createCrossRightLines());
        } else if(leftCrossIndex.includes(checkCrossIndex)){
            newRow_1.appendChild(createCrossLeftLines());
        }
        
      }
      
    }
    
    matrix.appendChild(newRow);
    matrix.appendChild(newRow_1);
  }
}

function createCrossLeftLines() {
  var line = document.createElement("div");
  line.className = "thumbnail";
  
  //the image part
  var img = document.createElement("img");
  img.setAttribute("src", "images/l_4.jpg");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  line.appendChild(img);

  return line;
}

function createCrossRightLines() {
  var line = document.createElement("div");
  line.className = "thumbnail";
  
  var img = document.createElement("img");
  img.setAttribute("src", "images/l_2.jpg");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  line.appendChild(img);
  
  return line;
}

function createHorizontalLines() {
  var line = document.createElement("div");
  line.className = "thumbnail";
  
  var img = document.createElement("img");
  img.setAttribute("src", "images/l_3.jpg");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  line.appendChild(img);

  return line;
}

function createVerticalLines() {
  var line = document.createElement("div");
  line.className = "line";
 
  //the image part
  var img = document.createElement("img");
  img.setAttribute("src", "images/l_1.jpg");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  line.appendChild(img);

  return line;
}


function initializeBoard(){
  clear();
  setButtonColor(0, 0, "tiger");
  setButtonColor(0, 4, "tiger");
  setButtonColor(4, 0, "tiger");
  setButtonColor(4, 4, "tiger");
  
}

function clear(){
  for(i = 0; i < 5; i++){
    for(j = 0; j < 5; j++){
       setButtonColor(i, j, "white");
    }
  }
}

function oneMoveBack(){
    var lastClickedBtn = logLastClicked();
    var x = parseInt(lastClickedBtn/5);
    var y = lastClickedBtn % 5;
    if(lastClickitem == "goat" && turn != ""){
      setButtonColor(x, y, "white");
        goats--;
        gleft++;
      checkGoatClick = 0;
      turn = "Goat";
    } else if(lastClickitem == "tiger" && turn != ""){
        setButtonColor(x, y, "tiger");
        checkTigerClick = 0;
        turn = "Tiger";
    } else if(lastClickitem == "goat1" && turn != ""){
        setButtonColor(x, y, "goat");
        checkGoatClick = 0;
        turn = "Goat";
    }
    lastClickitem = "";
    setTextBar(turn,gleft,gkilled);
}

function f1() {
  if(goats == 0){
    turn = "Goat";
    goats = 0;
    gleft = 20;
    gkilled = 0;

    fillStatusText();
    initializeBoard();
  }
}

function f2() {
  lastClickitem = "";
  turn = "Goat";
  goats = 0;
  gleft = 20;
  gkilled = 0;

  var headDivv = document.getElementById("head");
  var winnerRow = document.getElementById("win_1");
  if(winnerRow != null){
    headDivv.removeChild(winnerRow);
  }
  
  fillStatusText();
  initializeBoard();
}

function f3() {
  oneMoveBack();
}


// helper functions below

function createRow(className) {
  var rowDiv = document.createElement("div");
  if (className == null) {
    rowDiv.className = "row";
  } else {
    rowDiv.className = "row " + className;
  }
  return rowDiv;
}

function createButton(buttonText, styleClass, functionName) {
  var button = document.createElement("button");
  button.className = styleClass;
  button.id = buttonText;
  button.appendChild(document.createTextNode(buttonText));
  button.setAttribute("onclick", functionName);
  return button;
}

function createDefaultButton() {
  var button = document.createElement("div");
  button.className = "thumbnail";
  button.setAttribute("onclick", "buttonClicked("+i+","+j+")");

  //the image part
  var img = document.createElement("img");
  img.id = "img_" + i + "_" + j;
  img.setAttribute("src", "images/white.jpg");
  img.setAttribute("alt", "white");
  img.setAttribute("class", "rounded-circle");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  //the text part
  var text = document.createElement("label");
  text.setAttribute("class", "caption unselectable");
  text.id = "text_" + i + "_" + j;

  button.appendChild(img);
  button.appendChild(text);
  return button;
}

function setButtonColor(i, j, color) {
  var button = document.getElementById("img_" + i + "_" + j);
  button.setAttribute("src", "images/" + color + ".jpg");
  button.setAttribute("alt", color);
}

function setButtonText(i, j, text) {
  var button = document.getElementById("text_" + i + "_" + j);
  button.innerHTML = text;
}

function getButtonColor(i, j) {
  var img = document.getElementById("img_" + i + "_" + j);
  return img.getAttribute("alt");
}

function getButtonText(i, j) {
  var text = document.getElementById("text_" + i + "_" + j);
  return text.innerHTML;
}

//console interaction functions

function logLastClicked() {
  if (clickHistory.length == 0) {
    console.log("History is empty");
    return 0;
  } else {
    console.log(clickHistory[clickHistory.length - 1]);
    return clickHistory[clickHistory.length - 1];
  }
}

//this is what's triggered when any button in the matrix is pressed

function buttonClicked(i, j) { //this is where you should start
  
  if(turn == "Goat"){ 

    if(goats < 20){
      if(getButtonColor(i,j) == "white"){
        setButtonColor(i, j, "goat");
        turn = "Tiger";
        clickHistory.push(i*5 + j);
        lastClickitem = "goat";
        goats++;
        gleft--;
        checkWinner();
      } else {
        // inavlid move
        inavlidMoveAnimation(i,j,getButtonColor(i,j));
      }
    } else if(goats == 20){
        if(checkGoatClick == 0){
          if(getButtonColor(i,j) == "goat"){
            setButtonColor(i, j, "white");
            checkGoatClick = 1;
            clickHistory.push(i*5 + j);
            lastClickitem = "goat1";
          }
        } else if(logLastClicked() != (i*5 + j) && checkGoatClick == 1 && 
        isValidCrossJump(i,j)){
            if(getButtonColor(i,j) == "white"){
              var x = parseInt(logLastClicked()/5);
              var y = logLastClicked()%5;

              if((i==x || Math.abs(i-x) == 1) && (j==y || Math.abs(j-y) == 1)){
                  setButtonColor(i, j, "goat");
                  checkGoatClick = 0;
                  turn = "Tiger";
                  checkWinner();
              } else {
                inavlidMoveAnimation(i,j,getButtonColor(i,j));
              }
            } else {
              inavlidMoveAnimation(i,j,getButtonColor(i,j));
            }
        }  else {
          //invalid move
          inavlidMoveAnimation(i,j,getButtonColor(i,j));
        } 
    }
    
  } else if(turn == "Tiger"){

    if(checkTigerClick == 0){
        if(getButtonColor(i,j) == "tiger"){
         setButtonColor(i, j, "white");
         checkTigerClick = 1;
         clickHistory.push(i*5 + j);
         lastClickitem = "tiger";
        } 
    } else if(logLastClicked() != (i*5 + j) && checkTigerClick == 1 && isValidCrossJump(i,j)){
     
        if(getButtonColor(i,j) == "white"){
          
          var x = parseInt(logLastClicked()/5);
          var y = logLastClicked()%5;

          if((i==x || Math.abs(i-x) == 1) && (j==y || Math.abs(j-y) == 1)){
              setButtonColor(i, j, "tiger");
              checkTigerClick = 0;
              turn = "Goat";
              lastClickitem = "";
              checkWinner();
          } else if(Math.abs(i-x) <= 2 && Math.abs(j-y) <=2){
            if((x+i)%2 == 0 && (y+j)%2 == 0 && getButtonColor((x+i)/2, (y+j)/2) == "goat"){
              setButtonColor(i, j, "tiger");
              setButtonColor((x+i)/2, (y+j)/2, "white")
              checkTigerClick = 0;
              turn = "Goat";
              lastClickitem = "";
              gkilled++;
              checkWinner();
            } else {
              inavlidMoveAnimation(i,j,getButtonColor(i,j));
            }
          }else {
            inavlidMoveAnimation(i,j,getButtonColor(i,j));
          }
         
        } else {
          inavlidMoveAnimation(i,j,getButtonColor(i,j));
        }
      } else {
        //invalid move
        inavlidMoveAnimation(i,j,getButtonColor(i,j));
      }
   
    }
  
  setTextBar(turn, gleft, gkilled);

}

function setTextBar(tturn, ggoats, ggkilled){
  setStatusText("Turn: " + tturn +
                " Goats Left: " + ggoats+
                " Goats Killed: " + ggkilled, "text-bold");
}

function checkWinnerHelper(){
  
  if(turn == "Goat"){

    if(gkilled == 5){
      return 0; //tiger wins
    }else{
      if(tigerWins() == 0){
        return 0;
      } 
    }

  } else if(turn == "Tiger"){
      getTigerPos();
      var q;
      for(q=0; q<4; q++){

        var x,y;

        var c = tigerPos.pop();
        var m = parseInt(c/5);
        var n = c % 5;


        for(x=m-1; x<=m+1; x++){
          for(y=n-1; y<=n+1;y++){
            if(x>=0 && x<5 && y>=0 && y<5){
              if(x != m || y != n){
                  if(getButtonColor(x,y) == "white" && anyMoveLeft(m,n,x,y)){
                    return 2;
                  } else if( (2*x - m) >= 0 && (2*x - m) < 5 && (2*y - n) >= 0 && (2*y - n) < 5 && getButtonColor(x,y) == "goat" && getButtonColor((2*x) - m, (2*y) - n) == "white" && anyMoveLeft(m,n,x,y)){
                    return 2;
                  } 
              }
              
            } 
          }
        }

      }
      return 1;
  }

}

function tigerWins(){

  getGoatPos();

  if(goatPos.length == 0){
    return 2;
  } else {
       while(goatPos.length != 0){

        var p,q;

        var d = goatPos.pop();
        var a = parseInt(d/5);
        var b = d % 5;


        for(p=a-1; p<=a+1; p++){
          for(q=b-1; q<=b+1;q++){

            if(p>=0 && p<5 && q>=0 && q<5){
              if(p != a || q != b){
                  if(getButtonColor(p,q) == "white" && anyMoveLeft(a,b,p,q)){
                    return 2;
                  } 
              }
              
            } 
          }
        }
    }
  }
   
    return 0;
}

function checkWinner(){
  var win = checkWinnerHelper();
  
  if(win == 0){
    winBanner("Tiger Won!!");
    turn = "";
  } else if(win == 1){
    winBanner("Goat Won!!");
    turn = "";
  }

}


function getTigerPos(){
  for(a=0; a<5; a++){
    for(j=0; j<5; j++){
      if(getButtonColor(a,j) == "tiger"){
        tigerPos.push((a*5) + j);
      }
    }
  }
}
var goatPos = [];
function getGoatPos(){
  for(a=0; a<5; a++){
    for(j=0; j<5; j++){
      if(getButtonColor(a,j) == "goat"){
        goatPos.push((a*5) + j);
      }
    }
  }
}

function isValidCrossJump(i,j){
  var x = parseInt(logLastClicked()/5);
  var y = logLastClicked()%5;

  var lastClick = logLastClicked();
  var currentClick = i*5 + j;
  var notValidBtnArr = [5,1,15,11,7,3,21,17,13,9,23,19];
  
  if(notValidBtnArr.includes(lastClick) && notValidBtnArr.includes(currentClick)){
    if(Math.abs(i-x) <= 1 && Math.abs(j-y) <= 1){
      return false;
    } else if(Math.abs(i-x) == 2 && Math.abs(j-y) == 2){
        return false;
    }
  }

  return true;
}

function anyMoveLeft(i,j,k,l){
  
  var lastClick = i*5 + j;
  var currentClick = k*5 + l;
  var notValidBtnArr = [5,1,15,11,7,3,21,17,13,9,23,19];
  
  if(notValidBtnArr.includes(lastClick) && notValidBtnArr.includes(currentClick)){
    if(Math.abs(i-k) <= 1 && Math.abs(j-l) <= 1){
      return false;
    } else if(Math.abs(i-k) == 2 && Math.abs(j-l) == 2){
        return false;
    }
  }

  return true;
}

function inavlidMoveAnimation(r,s,btnImg){
  setButtonColor(r,s,"maroon");
  setTimeout( function(){
    setButtonColor(r,s,btnImg);
  }, 500);
  
}







