const employees = [];
var filteredEmployees = [];
const APIURL = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const employeeGrid = document.querySelector('.grid-container');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const employee = document.querySelector('.employee');
var displayedEmployees = document.getElementsByClassName('employee');
const input = document.querySelector('input');

// -------------------------------------------------------------------------------------------------------------- Fetch API

fetch(APIURL)
    .then(data => data.json())
    .then(res => res.results)
    .then(objs => objs.forEach(element => {
        employees.push(element);
        return appendEmployee(element);
        }))
    .catch(err => alert('Seems like there was an error', err))
;


console.log(employees);
// -------------------------------------------------------------------------------------------------------------- Functions

// Helper Function
  
function appendEmployee(obj){
    const newEmployee = document.createElement('DIV');
    newEmployee.className = "employee";
    employeeGrid.appendChild(newEmployee);
    
    newEmployee.innerHTML = `
        <img src="${obj.picture.medium}" alt="">
        <div class="text-container">
            <h2 class="name">${obj.name.first} ${obj.name.last}</h2>
            <p class="email">${obj.email}</p>
            <p class="city">${obj.location.city}</p>
        </div>
    `;
};


function getIndex(arr, element){
    for (let i = 0; i < arr.length; i++){
        if(arr[i] === element){
            return i;
        }
    }
}

function switchModal(targetObj){
    const targetDOB = new Date(targetObj.dob.date);
    modal.innerHTML = `
        <p class=close>Close</p>
        <p class="next">Next</p>
        <p class="prev"> Prev</p>
        <img src="${targetObj.picture.medium}" alt="">
        <h2 class="name">${targetObj.name.first} ${targetObj.name.last}</h2>
        <p class="email">${targetObj.email}</p>
        <p class="city">${targetObj.location.city}</p>
        <hr>
        <p class="phone">${targetObj.phone}</p>
        <p class="address">${targetObj.location.street.number} ${targetObj.location.street.name} ${targetObj.location.postcode}</p>
        <p class="birthday">Birthday: ${`${targetDOB.getMonth()+1}/${targetDOB.getDate()}/${targetDOB.getFullYear()}`}</p>
    `
    modal.style.display = 'flex';
    overlay.style.display = 'flex';
}



/*
    const filteredEmployees = employees.filter(obj => {
        return obj.name.first.toUpperCase().startsWith(liveSearchText.toUpperCase());
    });
    filteredEmployees.forEach(obj => appendEmployee(obj));
    
    console.log(employees);
    console.log(filteredEmployees)
*/


function filterEmployees(search, arr){



    filteredEmployees = arr.filter(obj => {
        return obj.name.first.toUpperCase().startsWith(liveSearchText.toUpperCase());
    });
    filteredEmployees.forEach(obj => appendEmployee(obj))









    arr.forEach(obj => {
        if (obj.name.first.startsWith( search.toUpperCase() ) === true){
            filteredEmployees.push(obj);
            appendEmployee(obj);
        }
    });

}

// -------------------------------------------------------------------------------------------------------------- Modal

// ----------------------------------------------- Opens Modal

document.addEventListener('click', (e) => {
    if(e.target.className === 'employee'){
        const targetObj = employees[getIndex(displayedEmployees, e.target)];
        const targetDOB = new Date(targetObj.dob.date);
        modal.innerHTML = `
            <p class=close>Close</p>
            <p class="next">Next</p>
            <p class="prev"> Prev</p>
            <img src="${targetObj.picture.medium}" alt="">
            <h2 class="name">${targetObj.name.first} ${targetObj.name.last}</h2>
            <p class="email">${targetObj.email}</p>
            <p class="city">${targetObj.location.city}</p>
            <hr>
            <p class="phone">${targetObj.phone}</p>
            <p class="address">${targetObj.location.street.number} ${targetObj.location.street.name} ${targetObj.location.postcode}</p>
            <p class="birthday">Birthday: ${`${targetDOB.getMonth()+1}/${targetDOB.getDate()}/${targetDOB.getFullYear()}`}</p>
        `
        modal.style.display = 'flex';
        overlay.style.display = 'flex';
    } 
});

// ----------------------------------------------- Closes Modal

document.addEventListener('click', (e)=> {
    if(e.target.className === 'close' || e.target.className === 'overlay' ){
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
});

// ----------------------------------------------- Filter

const keys = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
              "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "Backspace"];

document.addEventListener('keyup', (e) => {
    if (keys.includes(e.key)){


        console.log('filtered employees:');
        console.log(filteredEmployees);





        employeeGrid.innerHTML = '';
        const liveSearchText = input.value;
        filterEmployees(liveSearchText, employees)





        /*
        const filteredEmployees = employees.filter(obj => {
            return obj.name.first.toUpperCase().startsWith(liveSearchText.toUpperCase());
        });
        filteredEmployees.forEach(obj => appendEmployee(obj));
        
        console.log(employees);
        console.log(filteredEmployees)
        */
    }
    
});



// ----------------------------------------------- Arrows

document.addEventListener('click', (e)=> {
    if(e.target.className === 'next'){
        console.log(e.target.parentElement)
        console.log( getIndex(displayedEmployees, e.target.parentElement) )
        switchModal(e.target.parentNode)
    }
});

document.addEventListener('click', (e)=> {
    if(e.target.className === 'prev' || e.target.className === 'overlay' ){
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
});

//Get index function isn't working becuase I'm calling the target's ('Next') parent (the modal)

// Create a P element that is hidden that has a number asscoiated with it
// Take name on modal, loop through name of items (not DRY), get index



















