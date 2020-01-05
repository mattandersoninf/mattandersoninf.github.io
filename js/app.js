/* app.js */

// table container
const animatedTable = document.querySelector("table.board");

/*************************************************************
 *  ANIMATED TABLE EVENT LISTENER
 *  If the element pressed is a table cell and that table cell
 *  isn't already animated, then call the pulsePeach function.
 * ***********************************************************/
animatedTable.addEventListener("click", function(){
    
    // && !(event.target.classList.contains("animate-table-cell"))
    if (event.target.tagName == "TD" ){
        
        pulsePeachColor(event.target.id.substring(0, event.target.id.indexOf("-")), event.target.id.substring(event.target.id.indexOf("-")+1, event.target.id.length),3);
    
        // tableCell.id.substring(0,tableCell.id.indexOf("-")), tableCell.id.substring(tableCell.id.indexOf("-")+1, tableCell.id.length)
    }

});

/*************************************************************
 *  PULSE PEACH FUNCTION
 *  
 * ***********************************************************/
function pulsePeachColor(rowNum, colNum, pulseDepth){
    
    if(pulseDepth > -1 && verifyCoordinates(rowNum, colNum)){

        document.getElementById(rowNum+"-"+colNum).classList.add("animate-table-cell");
        
        window.setTimeout(function() {
            document.getElementById(rowNum+"-"+colNum).classList.remove('animate-table-cell');
        },1500);

        pulsePeachColor(rowNum-1,colNum,pulseDepth-1);
        pulsePeachColor(rowNum+1,colNum,pulseDepth-1);
        pulsePeachColor(rowNum,colNum-1,pulseDepth-1);
        pulsePeachColor(rowNum,colNum+1,pulseDepth-1);

    }

}

/*************************************************************
 *  VERIFY COORDINATES FUNCTION
 *  
 * ***********************************************************/
function verifyCoordinates(rowNum, colNum){
    if (document.getElementById(rowNum+"-"+colNum) != null){
        return true;
    }
    else{
        return false;
    }
}