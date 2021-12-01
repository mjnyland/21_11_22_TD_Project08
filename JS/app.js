//--------------------------------------------------------------------------------------- Variables

const apiUrl = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
var employees = [];
var filteredEmployees = employees.filter(obj => obj.isFiltered === true);
var displayedEmployees = document.getElementsByClassName('employee');
let search = document.querySelector('input');
const overlay = document.querySelector('.overlay');
const employeeGrid = document.querySelector('.grid-container');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const prev =  document.querySelector('.prev-arrow');
const next = document.querySelector('.next');
//--------------------------------------------------------------------------------------- Classes



class Employee {
    constructor(picture, fullname, email, city, phone, address, dob, _filtered, index){
        this.picture = picture;
        this.fullname = fullname;
        this.email = email;
        this.city = city;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
        this._filtered = _filtered;
        this.index = index;
    }

    set isFiltered(filtered) {
        this._filtered = filtered;
        if (this.fullname.startsWith(search.value) === true) {
            filtered = true;
        } else {
            filtered = false;
        }
    }

    get isFiltered() {
        return this._filtered;
    }

    get position(){
        for(let i=0; i<displayedEmployees.length; i++){
            if(parseInt(displayedEmployees[i].classList[1]) === this.index){
                return i;
            }
        }
    }

}



//--------------------------------------------------------------------------------------- Fetch API

fetch(apiUrl)
    .then(response => response.json() )
    .then(data => data.results)
    .then(objs => addEmployees(objs) )
    .then(arr => displayEmployee(arr));
    //Add .catch here
;


//--------------------------------------------------------------------------------------- Functions


function makeDate(apiDate){
    var date = new Date(apiDate)
    var month = date.getMonth()+1;
    var day = date.getDate(); 
    var year = date.getFullYear();
    var formattedDate = `${month}/${day}/${year}`
    return formattedDate;
}

function addEmployees(objs){
    let i = -1;
    objs.forEach(obj => {
        i++;
        var newEmployee = new Employee(obj.picture.large, `${obj.name.first} ${obj.name.last}`, obj.email, obj.location.city, obj.phone, `${obj.location.street.number} ${obj.location.street.name} ${obj.location.postcode}`, makeDate(obj.dob.date), true, i)
        employees.push(newEmployee);
    })
    return employees;
}

function searchFilter(arr){
    arr.forEach(obj => {
        if (obj.fullname.toUpperCase().includes(search.value.toUpperCase()) === true){
            obj.isFiltered = true;
        } else {
            obj.isFiltered = false;
        }
    });
    
    var filteredEmployees = arr.filter(obj => obj.isFiltered === true);
    
    return filteredEmployees;
}

function displayEmployee(arr){
    employeeGrid.innerHTML = '';
    for(let i = 0; i < arr.length; i++){
        let x = arr[i].index;
        const appendedEmployee = document.createElement('div');
        appendedEmployee.innerHTML = `
        <div class="employee ${x}">
            <img src="${arr[i].picture}" alt="Profile picture">
                <div class="text-container">
                    <h2> ${arr[i].fullname}</h2>
                    <p class="employee-display-email">${arr[i].email}</p>
                    <p class ="employee-display-city">${arr[i].city}</p>
                </div>
        </div>
        `;
        employeeGrid.appendChild(appendedEmployee);
    }
}

function displayModal(index){

    var filteredEmployees = employees.filter(obj => obj.isFiltered === true);
    const targetObj = filteredEmployees[index];

    

    if(displayedEmployees.length < 12){
        var obj = filteredEmployees[targetObj.position];
        modal.style.display = 'grid';
        modal.innerHTML = `
            <p class="close"></p>
            
            <div class="prev"><div class="prev-arrow"></div></div>
            <img src="${obj.picture}" alt="">
            <h2 class="name">${obj.fullname}</h2>
            <p class="email">${obj.email}</p>
            <p class="city">${obj.city}</p>
            <div class="rule"></div>
            <p class="phone">${obj.phone}</p>
            <p class="address">${obj.address}</p>
            <p class="birthday">Birthday: ${obj.dob}</p>
            <div class="next"><div class="next-arrow"></div></div>
        `;
        modal.className = `modal ${index}`;

        
    } else {
        var obj = employees[index];
        modal.style.display = 'grid';
        modal.innerHTML = `
            <p class="close"></p>
            
            <div class="prev"><div class="prev-arrow"></div></div>
            <img src="${obj.picture}" alt="">
            <h2 class="name">${obj.fullname}</h2>
            <p class="email">${obj.email}</p>
            <p class="city">${obj.city}</p>
            <div class="rule"></div>
            <p class="phone">${obj.phone}</p>
            <p class="address">${obj.address}</p>
            <p class="birthday">Birthday: ${obj.dob}</p>
            <div class="next"><div class="next-arrow"></div></div>
        `;
        modal.className = `modal ${index}`;
        
    }

   
    
    
    
    overlay.style.display = 'block';
}


//---------------------------------------------------------------------------------------------------//


function nextEmployee(index){
    displayModal(index + 1);
    const targetObj = employees[index];

}

function prevEmployee(index){
    displayModal(index - 1)
}


//--------------------------------------------------------------------------------------- Event Listeners

//Filter

document.addEventListener('keyup', (e) => {
    displayEmployee(searchFilter(employees));
    
    
});

//Opens modal

document.addEventListener('click', (e) => {
    if(e.target.classList.value.includes('employee') === true){
        var index = parseInt(e.target.classList[1], 10);
        const targetObj = employees[index];
        displayModal(targetObj.position); 
        
        
        if(targetObj.position === 0){
            modal.children[1].style.display = 'none';
        }
        
        if (displayedEmployees.length === 1){
            modal.children[1].style.display = 'none';
            modal.children[10].style.display = 'none';
        }
    }
});

//Next modal

document.addEventListener('click', (e) => {

    var filteredEmployees = employees.filter(obj => obj.isFiltered === true);

    if(e.target.className === 'next'){
        var index = parseInt(e.target.parentNode.classList[1], 10);
        const targetObj = filteredEmployees[index];


        if(targetObj.position === displayedEmployees.length - 2){
            nextEmployee(targetObj.position);
            modal.children[10].style.display = 'none';
        } else {
            nextEmployee(targetObj.position);
        }
        
        
    }
});

//Previous modal

document.addEventListener('click', (e) => {

    var filteredEmployees = employees.filter(obj => obj.isFiltered === true);

    if(e.target.className === 'prev'){
        var index = parseInt(e.target.parentNode.classList[1], 10);
        const targetObj = filteredEmployees[index];


        if(targetObj.position === 1){
            prevEmployee(targetObj.position);
            modal.children[1].style.display = 'none'; 
        } else {
            prevEmployee(targetObj.position);
        }
    }
});

//Close modal

document.addEventListener('click', (e) => {
    if(e.target.className === 'close'){
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
});


//--------------------------------------------------------------------------------------- Notes/Tests

