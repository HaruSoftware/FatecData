function nascimento() { 
    const fileContent = localStorage.getItem('fileContent');
    if (!fileContent) {
        console.error("Nenhum conteúdo de arquivo encontrado no localStorage.");
        return;
    }

    try {
        const data = extractData(fileContent);

        let yearCounts = {};

        for (let i = 1; i < data.length; i++) {
            
            let rawDate = data[i][26];

            if (rawDate) {
                let date;

                if (typeof rawDate === 'number') {
                    date = new Date((rawDate - 25569) * 86400 * 1000); // Conversão de serial do Excel
                } else {
                    date = new Date(rawDate);
                }

                if (!isNaN(date)) {

                    let year = date.getFullYear();
                    yearCounts[year] = (yearCounts[year] || 0) + 1; // Conta quantas vezes cada ano aparece
                } else {
                    console.error(`Data inválida na linha ${i}: ${rawDate}`);
                }
            }
        }
        const labels = Object.keys(yearCounts).map(Number).sort((a, b) => a - b);
        const values = Object.values(yearCounts);

        const totalOcorrencias = values.reduce((acc, count) => acc + count, 0);
        const mostCommonYear = labels.length ? labels[values.indexOf(Math.max(...values))] : "N/A";
        const leastCommonYear = labels.length ? labels[values.indexOf(Math.min(...values))] : "N/A";

        //Apply UI
        applyUI(1,"TOTAL DE RESPOSTAS",totalOcorrencias);
        applyUI(2,"ANO MAIS COMUM",`${mostCommonYear} (${yearCounts[mostCommonYear]})`);
        applyUI(3,"ANO MENOS COMUM",`${leastCommonYear} (${yearCounts[leastCommonYear]})`);

        //Create chart
        createChart(labels,values,"rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 1)");

    } catch (error) {
        console.error("Erro ao carregar o arquivo Excel:", error);
    }
}
