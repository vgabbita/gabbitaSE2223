//file name: branchingDemo.js
//author: Varun Gabbita
//objective: Demonstrate how to use Github branches

const months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const d = new Date();

//get month() reutrns the month a an integer (0-11). Jan = 0 Dec = 12
let month = months[d.getMonth()];

console.log('The date is '+ d);
