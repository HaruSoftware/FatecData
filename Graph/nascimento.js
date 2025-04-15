function nascimento() { 
    const fileContent = localStorage.getItem('fileContent');
    if (!fileContent) {
        console.error("Nenhum conteúdo de arquivo encontrado no localStorage.");
        return;
    }

    try {
        const data = extractData(fileContent);

        let faixaEtariaCounts = {};
        const currentYear = new Date().getFullYear();

        for (let i = 1; i < data.length; i++) {
            let rawDate = data[i][26];

            if (rawDate) {
                let date;

                if (typeof rawDate === 'number') {
                    date = new Date((rawDate - 25569) * 86400 * 1000); // Serial Excel
                } else {
                    date = new Date(rawDate);
                }

                if (!isNaN(date)) {
                    let idade = currentYear - date.getFullYear();

                    if (idade >= 0 && idade <= 120) {
                        let faixaInicio = Math.floor(idade / 8) * 8;
                        let faixaFim = faixaInicio + 7;
                        let faixaLabel = `Entre ${faixaInicio} a ${faixaFim} Anos`;

                        faixaEtariaCounts[faixaLabel] = (faixaEtariaCounts[faixaLabel] || 0) + 1;
                    }
                } else {
                    console.error(`Data inválida na linha ${i}: ${rawDate}`);
                }
            }
        }

        const labels = Object.keys(faixaEtariaCounts).sort((a, b) => {
            return parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]);
        });

        const values = labels.map(label => faixaEtariaCounts[label]);

        const totalOcorrencias = values.reduce((acc, count) => acc + count, 0);
        const mostCommonFaixa = labels.length ? labels[values.indexOf(Math.max(...values))] : "N/A";
        const leastCommonFaixa = labels.length ? labels[values.indexOf(Math.min(...values))] : "N/A";

        // Apply UI
        applyUI(1, "TOTAL DE RESPOSTAS", totalOcorrencias);
        applyUI(2, "FAIXA ETÁRIA MAIS COMUM", `${mostCommonFaixa} (${faixaEtariaCounts[mostCommonFaixa]})`);
        applyUI(3, "FAIXA ETÁRIA MENOS COMUM", `${leastCommonFaixa} (${faixaEtariaCounts[leastCommonFaixa]})`);

        // Create chart
        createChart(labels, values, "rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 1)");

    } catch (error) {
        console.error("Erro ao carregar o arquivo Excel:", error);
    }
}

