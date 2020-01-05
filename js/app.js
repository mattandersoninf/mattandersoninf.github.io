/* app.js */

// table container
const animatedTable = document.querySelector("table.board");

/*************************************************************
 *  ANIMATED TABLE EVENT LISTENER
 *  If the element pressed is a table cell and that table cell
 *  isn't already animated, then call the pulsePeach function.
 * ***********************************************************/
animatedTable.addEventListener("click", function(){
    
    if (event.target.tagName == "TD" && !(event.target.classList.contains("animate-table-cell"))){
        
        pulsePeachColor(event.target, 4);
    
    }

});

/*************************************************************
 *  PULSE PEACH FUNCTION
 *  
 * ***********************************************************/
function pulsePeachColor(tableCell, pulseDepth){
    let tableCellCoordinates = [tableCell.id.substring(0,tableCell.id.indexOf("-")), tableCell.id.substring(tableCell.id.indexOf("-")+1, tableCell.id.length)];
    if(pulseDepth > -1){
        tableCell.classList.add("animate-table-cell");
        window.setTimeout(function() {
            tableCell.classList.remove('animate-table-cell');
        },1500);
    }

}