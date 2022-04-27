// Your code here
function createEmployeeRecord(employeeArray) {
    // console.log("employee", employeeArray)
    const person = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [] 
    }
    return person
}

function createEmployeeRecords(arraysOfEmployees) {
    // console.log("arrayOfEmployees", arraysOfEmployees)
    const arrOfObjEmp = arraysOfEmployees.map(employee => createEmployeeRecord(employee))
    return arrOfObjEmp
}

function createTimeInEvent(employeeObject, dateStamp){
    const [date, hour] = dateStamp.split(" ")
    employeeObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeObject
}

function createTimeOutEvent(employeeObject, dateStamp){
    const [date, hour] = dateStamp.split(" ")
    employeeObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeObject
}

function hoursWorkedOnDate(person, date){
    const timeIn = person.timeInEvents.find(function (p){
        return p.date === date
    })
    const timeOut = person.timeOutEvents.find((p) => p.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(person, date){
    const timeIn = hoursWorkedOnDate(person, date) * person.payPerHour
    return timeIn
}

function allWagesFor(person) {
    const dateIn = person.timeInEvents.map(date => date.date)
    const allWages = dateIn.reduce((total, date) => {return total + wagesEarnedOnDate(person, date)},0)
    return allWages
}

function calculatePayroll(arraysOfEmp) {
    const allDates = arraysOfEmp.reduce((total, acc) => {
       console.log(acc)
        return total + allWagesFor(acc)
    },0)
    return allDates
}

