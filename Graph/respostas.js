function respostas() {

    const fileContent = localStorage.getItem('fileContent');
    if (!fileContent) {
        console.error("Nenhum conteúdo de arquivo encontrado no localStorage.");
        return;
    }

    try {

        const data = extractData(fileContent);
        let dateCounts = {};

        for (let i = 1; i < data.length; i++) {
            let rawDate = data[i][1]; // Segunda coluna (data)

            if (rawDate) {
                // Verifica se o valor da data é um número (serial do Excel)
                if (typeof rawDate === 'number') {
                    // Converte o número serial em uma data
                    let date = new Date((rawDate - 25569) * 86400 * 1000); // Correção para serial de data do Excel

                    // Verifica se a conversão foi bem-sucedida
                    if (isNaN(date)) {
                        console.error(`Data inválida na linha ${i}: ${rawDate}`);
                    } else {
                        // Formata a data em formato "dd/mm/aaaa"
                        let formattedDate = date.toLocaleDateString("pt-BR");

                        // Agrupa as datas, incrementando a contagem para cada data
                        if (dateCounts[formattedDate]) {
                            dateCounts[formattedDate] += 1;  // Se a data já existe, soma 1
                        } else {
                            dateCounts[formattedDate] = 1;  // Se não existe, cria a data com a contagem 1
                        }
                    }
                } else {
                    console.error(`Data inválida ou não numérica na linha ${i}: ${rawDate}`);
                }
            }
        }

        // Calcula a maior e a menor data
        const datesArray = Object.keys(dateCounts);

        // Converter a data no formato "dd/mm/aaaa" para "yyyy-mm-dd"
        const convertToDate = (dateString) => {
            const [day, month, year] = dateString.split("/");  // Separa o formato "dd/mm/aaaa"
            return new Date(`${year}-${month}-${day}`);  // Retorna no formato "yyyy-mm-dd"
        };

        const sortedDates = datesArray
        .map(date => ({ original: date, converted: convertToDate(date) }))
        .sort((a, b) => a.converted - b.converted);

        // Formata as datas para exibição
        const minDateFormatted = sortedDates[0].original;
        const maxDateFormatted = sortedDates[sortedDates.length - 1].original;

        const totalOcorrencias = Object.values(dateCounts).reduce((acc, count) => acc + count, 0);

        // Exibe as datas
        applyUI(1,"TOTAL DE RESPOSTAS",totalOcorrencias);
        applyUI(2,"PRIMEIRA RESPOSTA",`${minDateFormatted}`);
        applyUI(3,"ULTIMA RESPOSTA",`${maxDateFormatted}`);

        createChart(Object.keys(dateCounts), Object.values(dateCounts), "rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 1)");

    } catch (error) {
        console.error("Erro ao carregar o arquivo Excel:", error);
    }
}
