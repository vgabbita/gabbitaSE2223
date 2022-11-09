// Graph CSV data using chart.js




async function getData(){
    const response = await fetch('../data/ZonAnn.Ts+dSST.csv');
    const data = await response.text(); // CSV in TEXT format
    //console.log(data);
    const xYears = []; // x-axis labels = year value
    const yTemps = []; //y-axis value
    const yNHTemps = []; //y-axis value
    const ySHTemps = []; //y-axis value

    const table = data.split('\n').slice(1);       // split by line and remove the 0th row
    //console.log(table);



    table.forEach(row => {              // operate on each row
        const columns = row.split(','); // split each row into col.
        const year = columns[0];        // assign year value
        xYears.push(year);              // Push year value into array xYears
        const temp = parseFloat(columns[1]);        // global temp deviation
        yTemps.push(temp + 14);              // push temp value into array yTemps
        const nhTemp = parseFloat(columns[2]);      // NH temp
        yNHTemps.push(nhTemp + 14);              // push temp value into array yTemps
        const shTemp = parseFloat(columns[3]);      // SH temp  
        ySHTemps.push(shTemp + 14);              // push temp value into array yTemps
    });
    return {xYears, yTemps, yNHTemps, ySHTemps}; 
}

async function createChart(){
    const data = await getData();                    // createChart() will wait until getData() processes
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xYears,             // x-axis labels
            datasets: [
                {
                label: 'Combined Global Land-Surface Air and Sea-Surface Water Temperature in C°',
                data: data.yTemps,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Combined N.H Land-Surface Air and Sea-Surface Water Temperature in C°',
                data: data.yNHTemps,
                backgroundColor: 'rgba(0, 102, 255, 0.2)',
                borderColor: 'rgba(0, 102, 255, 0.2)',
                borderWidth: 1
            },
            {
                label: 'Combined S.H Land-Surface Air and Sea-Surface Water Temperature in C°',
                data: data.ySHTemps,
                backgroundColor: 'rgba(104, 2, 25, 255)',
                borderColor: 'rgba(104, 2, 25, 255)',
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
                        text: 'Year',
                        font: {
                            size: 20
                        },
                    }, 
                    ticks: {
                        callback: function(val, index){
                            return index % 5 === 0 ? this.getLabelForValue(val) : '';
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
                        text: 'Global Mean Temperature (°C)',
                        font: {
                            size: 20
                        },
                    }
                },
                ticks: {
                    maxTicksLimit: data.yTemps.length/10,
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: 'Combined Land Surface Air and Sea Surface Water Temperature in °C',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
        }
    });

    }

createChart();
getData();