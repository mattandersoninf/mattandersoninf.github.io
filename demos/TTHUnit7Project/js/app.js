/* app.js */
/* WARNING: the chart object will not be recognized until the Chart script in the html file calls it*/


// traffic chart element
const trafficChart = document.getElementById('traffic-chart').getContext('2d');

// daily chart element
const dailyChart = document.getElementById('daily-chart').getContext('2d');

// mobile chart element
const mobileChart = document.getElementById('mobile-chart').getContext('2d');

// alert container and it's close button
const alertContainer = document.getElementsByClassName('alert-container')[0];
const closeAlertButton = alertContainer.getElementsByTagName('BUTTON')[0];

// send user message button
const sendUserButtonContainer = document.getElementsByClassName("message-input-container")[0]
const sendUserButton = sendUserButtonContainer.getElementsByTagName('BUTTON')[0];
const messageConfirm = document.getElementsByClassName("message-confirm")[0];

// form elements to modify default behavior for submissions
const messageForm = document.querySelector('form.message-user-container');
const settingsForm = document.querySelector('form.settings-container');

messageForm.addEventListener('submit', evt => {  evt.preventDefault() });
settingsForm.addEventListener('submit', evt => {  evt.preventDefault() });

// list of searchable users
const searchableUsers = ['Victoria Chambers','Dale Byrd', 'Dawn Wood', 'Dan Oliver', 'Josh Sullivan']

// notification function on click
notificationBell = document.querySelector(".notification");

notificationBell.addEventListener("click", function(){

    if (document.querySelector(".dropdown-content").getAttribute("hidden") == ""){
        document.querySelector(".dropdown-content").removeAttribute("hidden");
    }
    else{
        document.querySelector(".dropdown-content").setAttribute("hidden","");
    }

    document.querySelector(".notification-marker").setAttribute("hidden","");

});


// line chart buttons
const hourlyLabel = document.querySelector("#hour");
const dailyLabel = document.querySelector("#day");
const weeklyLabel = document.querySelector("#week");
const monthlyLabel = document.querySelector("#month");
const hLabel = document.querySelector('[for="hour"]');
const dLabel = document.querySelector('[for="day"]');
const wLabel = document.querySelector('[for="week"]');
const mLabel = document.querySelector('[for="month"]');

hourlyLabel.addEventListener("click", function(){
    lineChart.data.datasets[0]["hidden"] = false;
    lineChart.data.datasets[1]["hidden"] = true;
    lineChart.data.datasets[2]["hidden"] = true;
    lineChart.data.datasets[3]["hidden"] = true;
    lineChart.update();
    hLabel.classList.add("active");
    dLabel.classList.remove("active");
    wLabel.classList.remove("active");
    mLabel.classList.remove("active");
});

dailyLabel.addEventListener("click", function(){
    lineChart.data.datasets[0]["hidden"] = true;
    lineChart.data.datasets[1]["hidden"] = false;
    lineChart.data.datasets[2]["hidden"] = true;
    lineChart.data.datasets[3]["hidden"] = true;
    lineChart.update();
    dLabel.classList.add("active");
    hLabel.classList.remove("active");
    wLabel.classList.remove("active");
    mLabel.classList.remove("active");
});

weeklyLabel.addEventListener("click", function(){
    lineChart.data.datasets[0]["hidden"] = true;
    lineChart.data.datasets[1]["hidden"] = true;
    lineChart.data.datasets[2]["hidden"] = false;
    lineChart.data.datasets[3]["hidden"] = true;
    lineChart.update();
    wLabel.classList.add("active");
    hLabel.classList.remove("active");
    dLabel.classList.remove("active");
    mLabel.classList.remove("active");
});

monthlyLabel.addEventListener("click", function(){
    lineChart.data.datasets[0]["hidden"] = true;
    lineChart.data.datasets[1]["hidden"] = true;
    lineChart.data.datasets[2]["hidden"] = true;
    lineChart.data.datasets[3]["hidden"] = false;
    lineChart.update();
    mLabel.classList.add("active");
    hLabel.classList.remove("active");
    dLabel.classList.remove("active");
    wLabel.classList.remove("active");
});

// on startup, give the setting inputs local storage values
function bodyOnLoad(){

    if (localStorage.getItem("email") == "true"){

        document.querySelector("#email").checked = true;
    }

    if (localStorage.getItem("public") == "true"){

        document.querySelector("#public").checked = true;

    }

    if (localStorage.getItem("timezone") != null){

        document.querySelector("#timezone").value = localStorage.getItem("timezone");

    }

    populate(document.querySelector("#user-search"), searchableUsers);
    
    hLabel.classList.add("active");

}

// autofill for user search function
function populate(inp, arr){
    var currentFocus;
  // add an event listener to the user search input so that when user type letters, the dropdown menu will adjust
    inp.addEventListener("input", function(e) {
        // declare 4 variable place holders from the user's input
        var a, b, i, val = this.value;
        // if there is a dropdown menu already visible close it
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        // create the dropdown menu element
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        // make container for user-search matches as a child of the dropdown menu
        this.parentNode.appendChild(a);
        // verify against every item in the user-array
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                // make a div for each matching user
                b = document.createElement("DIV");
                b.style.background = "#202020";
                // turn the matching letters bold
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                // insert a input field that will hold the current array item's value
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                // when somone clicks on the drop down item element, run this function
                b.addEventListener("click", function(e) {
                    // add the matched text to the drop down menu
                    inp.value = this.getElementsByTagName("input")[0].value;
                    // close all previously open lists
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        // users can use the down error in order to scroll through shown users in the drop down menu
        if (e.keyCode == 40) {
        
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
        } 
        // users can use the down error in order to scroll through shown users in the drop down menu
        else if (e.keyCode == 38) {
        currentFocus--;
        // make the current item more visible
        addActive(x);
        } 
        // if the enter key is pressed, select that user
        else if (e.keyCode == 13) {
        
            e.preventDefault();
            if (currentFocus > -1) {
                // and simulate a click on the "active" item
                if (x) x[currentFocus].click();
            }
        }
    });

    // this function distinguishes active elements in the drop down
    function addActive(x) {
        if (!x) return false;
            // remove 'active' from all drop down items altogether at the start
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        // add class "autocomplete-active"
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        // a function to remove the "active" class from all autocomplete items
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(element) {
        // close all autocomplete lists in the document, except the one passed as an argument
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (element != x[i] && element != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    // execute a function when someone clicks in the document
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

let lineChart = new Chart(trafficChart, {
    type: 'line',
    data: {
        labels:['16-22','23-29','30-5','6-12','13-19','20-26','27-3','4-10','11-17','18-24','25-31'],
        datasets:[{
            label: 'Hourly',
            // straightens out the line
            lineTension: 0,
            borderColor: '#0022FF',
            pointBackgroundColor: 'white',
            backgroundColor: '#b0b0ff',
            pointBorderWidth: 2,
            borderWidth: 1,
            fill: true,
            hidden: true,
            data:[
                '500',
                '1000',
                '750',
                '1250',
                '1750',
                '1250',
                '1500',
                '1000',
                '1500',
                '2000',
                '1500',
                '2000']
        },
        {
            label: 'Daily',
            // straightens out the line
            lineTension: 0,
            borderColor: '#0022FF',
            pointBackgroundColor: 'white',
            backgroundColor: '#b0b0ff',
            pointBorderWidth: 2,
            borderWidth: 1,
            fill: true,
            hidden: true,
            data:[
                '750',
                '250',
                '1000',
                '250',
                '750',
                '500',
                '750',
                '2500',
                '1500',
                '1000',
                '1500',
                '1000']
        },
        {
            label: 'Weekly',
            // straightens out the line
            lineTension: 0,
            borderColor: '#0022FF',
            pointBackgroundColor: 'white',
            backgroundColor: '#b0b0ff',
            pointBorderWidth: 2,
            borderWidth: 1,
            fill: true,
            hidden: false,
            data:[
                '500',
                '1000',
                '750',
                '1250',
                '1750',
                '1250',
                '1500',
                '1000',
                '1500',
                '2000',
                '1500',
                '2000']
        },
        {
            label: 'Monthly',
            // straightens out the line
            lineTension: 0,
            borderColor: '#0022FF',
            pointBackgroundColor: 'white',
            backgroundColor: '#b0b0ff',
            pointBorderWidth: 2,
            borderWidth: 1,
            fill: true,
            hidden: true,
            data:[
                '1000',
                '750',
                '500',
                '250',
                '1750',
                '500',
                '500',
                '500',
                '250',
                '1000',
                '500',
                '750']
        }]
    },
    options:{
        legend:{
            display: false
        },
        maintainAspectRatio: true
    }
});



let barChart = new Chart(dailyChart, {
    type: 'bar',
    data:{
        labels:['S','M','T','W','T','F','S'],
        datasets:[
            {
                backgroundColor: '#eb0000',
                borderRadius: 2,
                data:[
                    '50',
                    '75',
                    '150',
                    '100',
                    '200',
                    '175',
                    '75'
                ]
            }
        ]
    },
    options:{
        legend:{
            display: false
        }
    }
});


let doughnutChart = new Chart(mobileChart, {
    type: 'doughnut',
    data:{
        labels:['Phones','Tablets','Desktop'],
        datasets:[{
            backgroundColor: ['#0022ff','#eb0000','#03fce8'],
            data:[
                '15',
                '15',
                '70'
                ]
        }]
    },
    options:{
        rotation: -2.2,
        legend:{
            display: true
        }
    }
});

// alert element function
closeAlertButton.addEventListener("click", function(){
    alertContainer.style.display = "none";
});


// send user button function
sendUserButton.addEventListener("click", function(){
    
    if (document.querySelector("#user-search").value == ''){
        if (messageConfirm.getAttribute("hidden") == null){
            messageConfirm.setAttribute("hidden","");
        }
        document.querySelector(".user-fail").removeAttribute("hidden");
    }
    else{
        document.querySelector(".user-fail").setAttribute("hidden","");
    }

    if (document.querySelector("#user-message").value == ''){
        if (messageConfirm.getAttribute("hidden") == null){
            messageConfirm.setAttribute("hidden","");
        }

        document.querySelector(".message-fail").removeAttribute("hidden");
    }
    else{
        document.querySelector(".message-fail").setAttribute("hidden","");
    }

    if ((document.querySelector("#user-search").value != '') && (document.querySelector("#user-message").value.length != '')){
        
        if (document.querySelector(".message-fail").getAttribute("hidden") == null){
            document.querySelector(".message-fail").setAttribute("hidden","");
        }
        
        if (document.querySelector(".user-fail").getAttribute("hidden") == null){
            document.querySelector(".user-fail").setAttribute("hidden","");
        }

        messageConfirm.removeAttribute("hidden");
    }

})

document.querySelector("#save").addEventListener("click", function(){

    localStorage.setItem("email", document.querySelector("#email").checked);

    localStorage.setItem("public", document.querySelector("#public").checked);

    localStorage.setItem("timezone", document.querySelector("#timezone").value);

});

document.querySelector("#cancel").addEventListener("click", function(){

    localStorage.removeItem("email");

    localStorage.removeItem("public");

    localStorage.removeItem("timezone");

    document.querySelector("#email").checked = false;

    document.querySelector("#public").checked = false;

    document.querySelector("#timezone").value = 0;

});

