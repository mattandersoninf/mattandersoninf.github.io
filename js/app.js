/* app.js */

// table container
const animatedTable = document.querySelector("table.board");

/*************************************************************
 *  ON LOAD ANIMATION
 *  When the page is first loaded, show three random points  
 *  on the animated to demonstrate the pulse effect. 
 * ***********************************************************/
function onLoad(){
    let rand1 = [Math.floor(Math.random()*24), Math.floor(Math.random()*32)];
    let rand2 = [Math.floor(Math.random()*24), Math.floor(Math.random()*32)];
    let rand3 = [Math.floor(Math.random()*24), Math.floor(Math.random()*32)];
    pulsePeachColor(rand1[0],rand1[1],Math.floor(Math.random()*4)+1);
    pulsePeachColor(rand2[0],rand2[1],Math.floor(Math.random()*4)+1);
    pulsePeachColor(rand3[0],rand3[1],Math.floor(Math.random()*4)+1);
}

/*************************************************************
 *  ANIMATED TABLE EVENT LISTENER
 *  If the element pressed is a table cell then call the 
 *  pulsePeach function. The pulseDepth is randomly set to an 
 *  integer between 1 and 4.
 * ***********************************************************/
animatedTable.addEventListener("click", function(){
    
    // && !(event.target.classList.contains("animate-table-cell"))
    if (event.target.tagName == "TD" ){
        
        pulsePeachColor(event.target.id.substring(0, event.target.id.indexOf("-")), event.target.id.substring(event.target.id.indexOf("-")+1, event.target.id.length), Math.floor(Math.random()*4)+1);
    
        // tableCell.id.substring(0,tableCell.id.indexOf("-")), tableCell.id.substring(tableCell.id.indexOf("-")+1, tableCell.id.length)
    }

});

/*************************************************************
 *  PULSE PEACH FUNCTION
 *  Given an x coordinate, y coordinate, and pulseDepth, add  
 *  animate-table-cell to the table cell at those coordinates,
 *  remove the animation class after 500ms, and call the pulse
 *  function with a decremented pulse depth.
 * ***********************************************************/
function pulsePeachColor(rowNum, colNum, pulseDepth){
    
    if(pulseDepth > -1 && verifyCoordinates(rowNum, colNum)){

        document.getElementById(rowNum+"-"+colNum).classList.add("animate-table-cell");
        
        window.setTimeout(function() {
            document.getElementById(rowNum+"-"+colNum).classList.remove('animate-table-cell');

        },500);

        window.setTimeout(function() {
            pulsePeachColor(parseInt(rowNum,10)+1,parseInt(colNum,10),pulseDepth-1);
            pulsePeachColor(parseInt(rowNum,10),parseInt(colNum,10)+1,pulseDepth-1);
            pulsePeachColor(parseInt(rowNum,10)-1,parseInt(colNum,10),pulseDepth-1);
            pulsePeachColor(parseInt(rowNum,10),parseInt(colNum,10)-1,pulseDepth-1); 
        },200); 
        
    }

}

/*************************************************************
 *  VERIFY COORDINATES FUNCTION
 *  Check to see if the given coordinates correspond to an 
 *  existing element that has an id attribute with these
 *  coordinates.
 * ***********************************************************/
function verifyCoordinates(rowNum, colNum){
    if (document.getElementById(rowNum+"-"+colNum) != null && rowNum >= 0 && rowNum <= 24 && colNum >= 0 && colNum <= 31){
        return true;
    }
    else{
        return false;
    }
}

/*************************************************************
 *  RESIZING FUNCTIONS
 *  When the screen size is altered, call the resizing
 *  functions.
 * ***********************************************************/
window.addEventListener('resize', function(){

  
  currWindowWidth = window.innerWidth;

  if(currWindowWidth >= 1024){

    desktopScreenProjectColumnSize();

  }
  else if(currWindowWidth >= 768 && currWindowWidth < 1024){

    tabletScreenProjectColumnSize();

  }
  else{

    mobileScreenProjectColumnSize();
  }
  

});


function mobileScreenProjectColumnSize(){

  document.querySelectorAll('.project-card').forEach(projectCard => {
    
    if(!(projectCard.classList.contains('col-xs-12'))){
      projectCard.classList.add('col-xs-12');
    }

    if(projectCard.classList.contains('col-xs-6')){
      projectCard.classList.remove('col-xs-6');
    }
    
    if(projectCard.classList.contains('col-xs-3')){
      projectCard.classList.remove('col-xs-3');
    }

  });

} 

function tabletScreenProjectColumnSize(){

  document.querySelectorAll('.project-card').forEach(projectCard => {
    
    if(projectCard.classList.contains('col-xs-12')){
      projectCard.classList.remove('col-xs-12');
    }
    
    if(!(projectCard.classList.contains('col-xs-6'))){
      projectCard.classList.add('col-xs-6');
    }

    if(projectCard.classList.contains('col-xs-3')){
      projectCard.classList.remove('col-xs-3');
    }

  });

}

function desktopScreenProjectColumnSize(){

  document.querySelectorAll('.project-card').forEach(projectCard => {
    
    if(projectCard.classList.contains('col-xs-12')){
      projectCard.classList.remove('col-xs-12');
    }
    
    if(projectCard.classList.contains('col-xs-6')){
      projectCard.classList.remove('col-xs-6');
    }
    
    if(!(projectCard.classList.contains('col-xs-3'))){
      projectCard.classList.add('col-xs-3');
    }

  });

}

/*******************************
 *  SMOOTH SCROLLING 
 * 
 * $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
 * 
 *********************************/