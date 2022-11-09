// Graph CSV data using chart.js




async function getData(){
    const response = await fetch('../data/VarunResults.csv');
    const data = await response.text(); // CSV in TEXT format
    //console.log(data);
    const xDays = []; // x-axis labels = year value
    const yControl = []; // y-axis values = control value
    const yConePre = []; //y-axis value
    const yConeHome = []; //y-axis value
    const yOrePre = []; //y-axis value
    const yOreHome = []; //y-axis value
    const ySoap = []; //y-axis value
    const yWater = []; //y-axis value
    const yVinegar = []; //y-axis value

    const table = data.split('\n').slice(1);       // split by line and remove the 0th row
    //console.log(table);



    table.forEach(row => {              // operate on each row
        const columns = row.split(','); // split each row into col.
        const day = columns[0];        // assign year value
        xDays.push(day);              // Push day value into array xYears\
        const control = columns[1];        // assign control values
        yControl.push(control);              // Push control value into array yControl
        const conePre = parseFloat(columns[2]);        // Coneflower Pre-Made
        yConePre.push(conePre);              // push Coneflower premade value into array yConePre
        const coneHome = parseFloat(columns[3]);      // Coneflower Home-Made values
        yConeHome.push(coneHome);              // push Coneflower homemade value into array yConeHome
        const OrePre = parseFloat(columns[4]);      // Oregano Pre-Made values  
        yOrePre.push(OrePre);              // push oregano pre made value into array yTemps
        const OreHome = parseFloat(columns[5]);      // oregano Home-Made values
        yOreHome.push(OreHome);              // push Oregano Home-made values into array yTemps
        const Soap = parseFloat(columns[6]);      // Soap values
        ySoap.push(Soap);              // push Soap value into array yTemps

    });
    return {xDays, yControl, yConePre, yConeHome, yOrePre, yOreHome, ySoap}; // return object
}

async function createChart(){
    const data = await getData();                    // createChart() will wait until getData() processes
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xDays,             // x-axis labels
            datasets: [
                {
                label: 'Control',
                data: data.yControl,
                backgroundColor: 'rgba(255, 99, 132, 100)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Coneflower Pre-Made',
                data: data.yConePre,
                backgroundColor: 'rgba(0, 102, 255, 0.2)',
                borderColor: 'rgba(0, 102, 255, 0.2)',
                borderWidth: 1
            },
            {
                label: 'Coneflower Home-Made',
                data: data.yConeHome,
                backgroundColor: 'rgba(104, 2, 25, 255)',
                borderColor: 'rgba(104, 2, 25, 255)',
                borderWidth: 1
            },
            {
                label: 'Oregano Pre-Made',
                data: data.yOrePre,
                backgroundColor: 'rgba(12, 233, 25, 123)',
                borderColor: 'rgba(12, 233, 25, 123)',
                borderWidth: 1
            },
            {
                label: 'Oregano Home-Made',
                data: data.yOreHome,
                backgroundColor: 'rgba(255,130, 5, 10)',
                borderColor: 'rgba(255,130, 5, 10)',
                borderWidth: 1  
            },
            {
                label: 'Soap',
                data: data.ySoap,
                backgroundColor: 'rgba(25, 125, 122, 23)',
                borderColor: 'rgba(25, 125, 122, 23)',
                borderWidth: 1
            }
        ]   
        },
        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {
                    title: {
                        display: true,
                        text: 'Days',
                        font: {
                            size: 20
                        },
                    }, 
                    ticks: {
                        callback: function(val, index){
                            return index % 2 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font: {
                            size: 15
                        },
                    },
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Diameter of Antibacterial Zone (cm)',
                        font: {
                            size: 20
                        },
                    }
                }
        }
        }
    });

    }

createChart();
getData();