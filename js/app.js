/* app.js */

// table container
const animatedTable = document.querySelector("table.board");

// animated table event listener
animatedTable.addEventListener("click", function(){
    
    if (event.target.tagName == "TD" && !(event.target.classList.contains("animate-table-cell"))){
        
        pulsePeachColor(event.target);
    
    }

});


function pulsePeachColor(tableCell){
    event.target.classList.add("animate-table-cell");
    console.log(tableCell.classList);
    // setTimeout(tableCell.classList.remove("animate-table-cell"),2000);
    console.log(tableCell.classList);

}