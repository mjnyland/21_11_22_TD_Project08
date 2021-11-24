//--------------------------------------------------------------------------------------- Variables

const apiUrl = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
var employees = [];
const employeeGrid = document.querySelector('.grid-container');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');


//--------------------------------------------------------------------------------------- Classes



class Employee {
    
    constructor(picture, fullname, email, city, phone, address, dob){
        this.picture = picture;
        this.fullname = fullname;
        this.email = email;
        this.city = city;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
        this._filter = true;
    }

    set isFiltered(filtered) {
        this._filtered = filtered;
        if (search.startsWith(fullname) === true) {
            filtered = true;
        } else {
            filtered = false;
        }
    }

    get isFiltered() {
        return this._filtered;
    }

    get employeeData(){

    }
}



//--------------------------------------------------------------------------------------- Fetch API

fetch(apiUrl)
    .then(response => response.json() )
    .then(data => data.results)
    .then(objs => addEmployees(objs) )
    .then(arr => console.log(arr))
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
    console.log(objs)
    objs.forEach(obj => {
        var newEmployee = new Employee(obj.picture.large, `${obj.name.first} ${obj.name.last}`, obj.email, obj.location.city, obj.phone, `${obj.location.street.number} ${obj.location.street.name} ${obj.location.postcode}`, makeDate(obj.dob.date, true) )
        employees.push(newEmployee);
    })
    return employees;
}

function displayEmployee(arr){
    arr.forEach(obj => {
        if(obj.startsWith(search) === true ){
            obj.filter = true;
        } else {
            obj.filter = false;
        }
    });
}

//--------------------------------------------------------------------------------------- Event Listeners

document.addEventListener('click', (e) => {
    console.log(employees);
});

//--------------------------------------------------------------------------------------- Notes/Tests



/*

this.img = this.picture.large;
        this.fullname = `${this.name.first} ${this.name.last}`;
        this.email = this.email;
        this.city = this.location.city;
        this.phone = this.phone;
        this.address = `${this.location.street.number} ${this.location.street.name} ${this.location.postcode}`;
        this.dob = makeDate(this.dob.date)

*/
