function createChart(labels, data, backgroundColor, borderColor) {

    const ctx = document.getElementById("myChart").getContext("2d");

    if (window.myChart && window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: " Total",
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function applyUI(box, header, value) {

    if (typeof box != 'number') {
        console.error("valor digitado não é um numero!");
        return;
    }

    switch (box) {
        case 1:
            document.getElementById("firstBox").innerText = header;
            document.getElementById("firstBoxValue").innerText = value
            break;
        case 2:
            document.getElementById("secBox").innerText = header;
            document.getElementById("secBoxValue").innerText = value;
            break;
        case 3:
            document.getElementById("thirdBox").innerText = header;
            document.getElementById("thirdBoxValue").innerText = value;
            break;
    }
}

function extractData(fileContent) {
    const base64Prefix = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
    if (!fileContent.startsWith(base64Prefix)) {
        throw new Error("O conteúdo não está no formato base64 válido.");
    }

    const base64Data = fileContent.substring(base64Prefix.length);
    const byteCharacters = atob(base64Data);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
    }
    const arrayBuffer = byteArray.buffer;

    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    return data;
}
function GenerateMethod(columnId, id01, id02, box01, box02) {

    const fileContent = localStorage.getItem('fileContent');
    if (!fileContent) {
        console.error("Nenhum conteúdo de arquivo encontrado no localStorage.");
        return;
    }

    const data = extractData(fileContent);

    let counts = {};
    let firstValue = 0;
    let secValue = 0;

    let column = Number(columnId);

    for (let i = 1; i < data.length; i++) {

        let state = data[i][column];

        if (state) {
            state = state.toString().trim().replace(/;$/, "");
            counts[state] = (counts[state] || 0) + 1;

            if (state === id01) {
                firstValue++;
            }
            if (state === id02 || id02 === "..others.." && state != id01) {
                secValue++;
            }
        }
    }

    const entries = Object.entries(counts);
    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

    const biggest = sortedEntries[0]?.[0];
    const lowest = sortedEntries[sortedEntries.length - 1]?.[0];

    switch(id01)
    {
        case "..biggest..": firstValue = biggest; break;
        case "..biggestValue..": firstValue = counts[biggest] || 0; break;
        case "..lowest..": firstValue = lowest; break;
        case "..lowestValue..": firstValue = counts[lowest] || 0; break;
    }
    switch(id02)
    {
        case "..biggest..": secValue = biggest; break;
        case "..biggestValue..": secValue = counts[biggest] || 0; break;
        case "..lowest..": secValue = lowest; break;
        case "..lowestValue..": secValue = counts[lowest] || 0; break;
    }

    applyUI(1, "TOTAL DE RESPOSTAS", Object.values(counts).reduce((acc, current) => acc + current, 0));
    applyUI(2, box01.toUpperCase(), firstValue.toString());
    applyUI(3, box02.toUpperCase(), secValue.toString());

    return counts;

}
function GenerateData(column, data01, data02, box01, box02) {

    let count = GenerateMethod(column, data01, data02, box01, box02);
    count = Object.fromEntries(Object.entries(count).sort());

    const labels = Object.keys(count);
    const values = Object.values(count);

    if("Sim" in count && "Não" in count){
        createChart(labels,values,["rgba(63, 162, 255, 0.6)", "rgba(245, 57, 57, 0.6)"],["rgb(75, 130, 192)", "rgba(245, 57, 57, 1)"]);
    }else{
        createChart(labels, values, "rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 1)");
    }
}