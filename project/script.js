let csvData = [];

document.getElementById("toggleTheme").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

function loadCSV() {
    const fileInput = document.getElementById("csvFileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a CSV file!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const lines = event.target.result.split("\n");
        csvData = lines.map(line => line.split(","));

        displayTable();
    };

    reader.readAsText(file);
}

function displayTable() {
    const tableHeader = document.getElementById("tableHeader");
    const tableBody = document.getElementById("tableBody");

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    csvData.forEach((row, index) => {
        let tr = document.createElement("tr");

        row.forEach(cell => {
            let td = document.createElement(index === 0 ? "th" : "td");
            td.textContent = cell;
            tr.appendChild(td);
        });

        if (index === 0) {
            tableHeader.appendChild(tr);
        } else {
            tableBody.appendChild(tr);
        }
    });
}

function cleanData() {
    if (csvData.length === 0) {
        alert("No data loaded!");
        return;
    }

    csvData = csvData.filter((row, index, self) => {
        return index === 0 || self.findIndex(r => JSON.stringify(r) === JSON.stringify(row)) === index;
    });

    alert("Data cleaned successfully!");
    displayTable();
}

function plotLineChart() {
    plotChart('line');
}

function plotBarChart() {
    plotChart('bar');
}

function plotPieChart() {
    plotChart('pie');
}

function plotScatterChart() {
    plotChart('scatter');
}

function plotChart(type) {
    const ctx = document.getElementById("dataChart").getContext("2d");

    if (csvData.length < 2) {
        alert("Not enough data for visualization!");
        return;
    }

    const labels = csvData.slice(1).map(row => row[0]);
    const values = csvData.slice(1).map(row => parseFloat(row[1]));

    new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: "Data Visualization",
                data: values,
                backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 2
            }]
        }
    });
}

function generateStats() {
    if (csvData.length < 2) {
        alert("Not enough data for analysis!");
        return;
    }

    const values = csvData.slice(1).map(row => parseFloat(row[1]));
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    alert(`📊 Statistics:\nMean: ${mean.toFixed(2)}\nMin: ${min}\nMax: ${max}`);
}
