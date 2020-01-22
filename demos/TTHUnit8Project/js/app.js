/* app.js */

// modal element
const modal = document.querySelector(".modal");

// modal container element
const modalContainer = document.querySelector(".modal-container");

// append the employee model information to this element
const modalEmployeeContent = document.querySelector(".modal-employee-content");

// add event listener for the modal close button
const closeButton = document.querySelector(".modal-close");

// the randomuser generator API site
const url = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob &nat=US";

// employee-search input element
const employeeSearch = document.querySelector("#employee-search");

let employeeContainers = [];

let visibleEmployeesList = [];

// use fetch api to set up the employee containers
function onloadFillEmployees(){

  // this counter is for populating the employee-container with an unique class name
  let i = 0;

  // hide modal
  modal.classList.add("hidden");

  // FETCH API PROMISE
  // 1. Call the fetch api to grab information from the provided url
  // 2. Format the response into json
  // 3. Disect the json information and sort it's results into the employeeInfoHTML.
  // IMPORTANT: fetch returns objects
  fetch(url)
  .then((response) => response.json())
  .then(function(data){

      // build the employee-container
    data.results.forEach(employee => {

      // create a date object so that the information from the dob can be extracted more easily
      let employeeDOB  = new Date(employee.dob.date);

      // construct the employee html of the employee-container
      let employeeInfoHTML = ` 
      <div class="employee-container-`+i+` grid-section">
          <div class="employee-img-container">
            <img src="${employee.picture.large}" class="img-rounded" alt="${employee.email}">
          </div>
          <div class="employee-text-container">
            <div class="employee-primary-text">${employee.name.first + " " + employee.name.last}</div>
            <div class="employee-secondary-text">${employee.email}</div>
            <div class="employee-secondary-text">${employee.location.city}</div>
            <div class="employee-modal-info">
              <hr />
              <div class="employee-secondary-text">${employee.cell}</div>
              <div class="employee-secondary-text">${employee.location.street.number+" "+employee.location.street.name+" "+employee.location.city+", "+employee.location.state+" "+employee.location.postcode}</div>
              <div class="employee-secondary-text">Birthday: ${employeeDOB.getMonth()}/${employeeDOB.getDate()}/${employeeDOB.getFullYear()}</div>
            </div>
          </div>
      </div>
      `;

      // add the html of the employee container to the employees-container element
      document.querySelector("main").innerHTML += employeeInfoHTML;

      i++;

    });

    // apply an eventlistener to every employee-container
    employeeContainers = document.querySelectorAll('main [class*="employee-container"]');

    // EMPLOYEE CONTAINER EVENT LISTENER
    // Clicking any of the employee containers triggers the following sequence of events
    // 1. Fill the list of the employee-container-classes with the classes of all visible employee containers (they will act as pointers) 
    // 2. Fill the model-employee-content element with the employee-container element that was clicked
    // 3. Show the modal. 
    employeeContainers.forEach(employeeContainer =>{
      
      employeeContainer.addEventListener("click", function(){

        document.querySelectorAll('main [class*="employee-container"]:not(.hidden)').forEach(visibleEmployee =>{
          visibleEmployeesList.push(visibleEmployee.classList[0]);
        });

        modalEmployeeContent.appendChild(employeeContainer.cloneNode(true));

        // show the modal
        modal.classList.remove("hidden");
      
      });

    });

  })
  .catch(err => console.log(err));

}

// MODAL CLOSE EVENT LISTENER
// 1. Empty the modal-employee-content
// 2. Empty the visibleEmployeesList by setting it's length to 0.
// 3. Hide the modal.
document.querySelector(".modal-close").addEventListener("click", function(){
  
  modalEmployeeContent.innerHTML = "";

  visibleEmployeesList.length = 0;
  
  modal.classList.add("hidden");

});

// close the modal if the modal is present and it's clicked, not including the area for the modal-container
window.addEventListener("click", function(){
  if (event.target.classList.contains("modal")){
    
    modalEmployeeContent.innerHTML = "";
    
    visibleEmployeesList.length = 0;
    
    modal.classList.add("hidden"); 
  
  }
});

// SEARCH FUNCTION
// Clicknig any letter or number key triggers the folowing actions
// 1. Create a searchable variable
employeeSearch.addEventListener("keyup", function(){
  
  // grab the text that the user has typed
  // use toLowerCase so that it will still return the correct result if the user uses upper case
  let searchable = event.target.value.toLowerCase();

  let a, txt;
    
  // Toggle the visibility of the figures that have the employee-primary-text class(exclusive to the employee's name).
  // If the searchable text matches part of the text within the figure, it will be visible, you won't see it otherwise.  
  for (let m = 0; m < document.querySelectorAll('[class*="employee-container-"]').length; m++){

    //
    a = document.querySelectorAll('[class*="employee-container-"]')[m];
    
    //
    txt = a.querySelector(".employee-primary-text").textContent;
    
    if(txt.toLowerCase().indexOf(searchable) > -1){
      a.classList.remove("hidden");
    }
    else
    {
      a.classList.add("hidden");
    }

  }

});


// PREVIOUS BUTTON EVENT LISTENER
// 1. Get the employee-container class that is currently visible
// 2. Remove the current employee content from the modal
// 3. Get a list of all the visible employees in main
// 4. Find the index the employee-container captured previously and subtract 1
// 5.a. If the index is less than zero, populate the modal with the last visible employee container
// 5.b. Else, populate the modal with the employee-container whose index is 1 less than the previously visible one
document.querySelector(".prev-container").addEventListener("click", function(){

  // store the employee-container class that is currently shown in the modal
  let tempVisibleModalEmployee = document.querySelector('.modal-employee-content [class*="employee-container-"]').classList[0];

  let tempIndex = visibleEmployeesList.indexOf(tempVisibleModalEmployee);

  tempIndex--;

  if (tempIndex < 0){
    tempIndex = visibleEmployeesList.length - 1;
  } 

  modalEmployeeContent.innerHTML = "";

  modalEmployeeContent.appendChild(document.querySelector("."+visibleEmployeesList[tempIndex]).cloneNode(true));

});

// NEXT BUTTON EVENT LISTENER
// 1. Get the employee-container class that is currently visible
// 2. Get the employee-container class's index in the visibleEmployeeList
// 3. Hide the currently visible container
// 3. Increment the index
// 4. Check if the index falls into the range of the visibleEmployeeList
// 4.a. if it doesn't reset the index to the length of the visibleEmployeeList
// 5. Show the employee-container corresponding to the new index in the visibleEmployeeList
document.querySelector(".next-container").addEventListener("click", function(){
  
  // store the employee-container class that is currently shown in the modal
  let tempVisibleModalEmployee = document.querySelector('.modal-employee-content [class*="employee-container-"]').classList[0];

  let tempIndex = visibleEmployeesList.indexOf(tempVisibleModalEmployee);

  tempIndex++;

  if (tempIndex > visibleEmployeesList.length - 1){
    tempIndex = 0;
  } 

  modalEmployeeContent.innerHTML = "";

  modalEmployeeContent.appendChild(document.querySelector("."+visibleEmployeesList[tempIndex]).cloneNode(true));

});