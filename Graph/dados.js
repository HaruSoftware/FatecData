let lastColumnUsed;


function SetData(column) {

    column = Number(column);

    //verifica se a ultima coluna selecionada é a mesma
    if (column === lastColumnUsed) {
        return;
    }

    lastColumnUsed = column;

    var simnaorepetidos = [87, 90, 93, 96, 99, 128, 131, 134, 137, 142, 145, 148, 151, 154, 157, 162, 165, 168, 171, 176, 179, 182, 185, 188, 191, 196, 199, 202, 205, 210, 213, 216, 219, 222, 225, 291, 312];

    var avancadoRepetidos = [
        228, 233, 236, 239, 242, 245, 248
    ];

    //Verifica se a coluna possui dados repetidos para sim e não
    if (simnaorepetidos.includes(column)) {
        GenerateData(column, "Não", "Sim", "NÃO", "SIM");
        return;
    }
    //Verifica dados repetidos das colunas de conhecimento
    if (avancadoRepetidos.includes(column)) {
        GenerateData(column, "Avançado", "Pouco", "Avançado", "Pouco");
        return;
    }

    switch (column) {
        //Gerar dados do periodo dos alunos
        case 11: GenerateData(11, "Matutino", "Noturno", "Matutino", "Noturno"); break;
        //Gerar dados dos estados de nascimento dos alunos
        case 17: GenerateData(17, "..biggest..", "..lowest..", "Estado Mais Comum", "Estado Menos Comum"); break;
        //Gerar dados das cidades que os alunos vivem
        case 20: GenerateData(20, "..biggest..", "..lowest..", "Cidade Mais Comum", "Cidade Menos Comum"); break;
        //Gerar dados dos generos dos alunos
        case 23: GenerateData(23, "Masculino", "Feminino", "Masculino", "Feminino"); break;
        //Gerar dados sobre união dos alunos
        case 29: GenerateData(29, "Casado(a)/União Estável", "Solteiro(a)", "Casados(as)", "Solteiros(as)"); break;
        //Gerar dados sobre deficiencia dos alunos
        case 32: GenerateData(32, "Nenhuma", "Outra(s)", "Nenhuma", "Outra(s)"); break;
        //Gerar dados sobre filhos dos alunos
        case 35: GenerateData(35, "Nenhum", "..others..", "Nenhum", "1 OU MAIS"); break;
        //Gerar dados sobre com quem os alunos moram
        case 38: GenerateData(38, "Sozinho", "Com pais e(ou) parentes", "Sozinho", "Com pais e(ou) parentes"); break;
        //Gerar dados sobre quantas pessoas moram com os alunos
        case 41: GenerateData(41, "1", "..others..", "Sozinho", "2 OU MAIS"); break;
        //Gerar dados sobre a condição do imóvel que o aluno mora
        case 44: GenerateData(44, "Alugado", "Financiado", "Alugado", "Financiado"); break;
        //Gerar dados sobre o tempo que o aluno mora no mesmo lugar
        case 47: GenerateData(47, "0 a 12 meses", "..others..", "0 a 12 Meses", "MAIS DE 1 ANO"); break;
        //Gerar dados sobre a faixa de renda dos alunos
        case 50: GenerateData(50, "De R$ 0,00 até R$ 1.518,00", "Prefiro não informar", "De R$ 0,00 até R$ 1.518,00", "Prefiro não informar"); break;
        //Gerar dados sobre quantas televisões o aluno possui
        case 55: GenerateData(55, "Nenhum", "..others..", "Nenhum", "1 ou mais"); break;
        //Gerar dados sobre quantos dvds o aluno possui
        case 58: GenerateData(58, "Nenhum", "..others..", "Nenhum", "1 ou mais"); break;
        //Gerar dados sobre quantos radios o aluno possui
        case 61: GenerateData(61, "Nenhum", "..others..", "Nenhum", "1 ou mais"); break;
        //Gerar dados sobre quantos carros o aluno possui
        case 64: GenerateData(64, "Nenhum", "..others..", "Nenhum", "1 ou mais"); break;
        //Gerar dados sobre quantas motos o aluno possui
        case 67: GenerateData(67, "Nenhum", "..others..", "Nenhum", "1 ou mais"); break;
        //Gerar dados sobre quantas maquinas de lavar o aluno possui
        case 70: GenerateData(70, "Nenhum", "..others..", "Nenhum", "1 ou mais"); break;
        //Gerar dados sobre quantas geladeiras o aluno possui
        case 73: GenerateData(73, "Nenhum", "..others..", "Nenhum", "1 ou mais"); break;
        //Gerar dados sobre quantos celulares o aluno possui
        case 76: GenerateData(76, "1", "..others..", "1", "MAIS DE 1"); break;
        //Gerar dados sobre quantos computadores o aluno possui
        case 79: GenerateData(79, "Nenhum", "..others..", "Nenhum", "1 OU MAIS"); break;
        //Gerar dados sobre quantos notebooks o aluno possui
        case 82: GenerateData(82, "Nenhum", "..others..", "Nenhum", "1 OU MAIS"); break;
        //Gerar dados sobre qual vinculo de trabalho do aluno
        case 102: GenerateData(102, "Não trabalho", "Sou autônomo(a)", "Não trabalho", "AUTÔNOMO"); break;
        //Gerar dados sobre qual area o aluno trabalha
        case 105: GenerateData(105, "Trabalho na área do curso", "Trabalho fora da área do curso", "Trabalho na área do curso", "Trabalho fora da área do curso"); break;
        //Gerar dados sobre o regime de trabalho do aluno
        case 108: GenerateData(108, "Regime Integral", "Regime de meio Período", "Regime Integral", "Regime de meio Período"); break;
        //Gerar dados sobre onde o aluno trabalho
        case 111: GenerateData(111, "Não trabalho", "..others..", "Não Trabalho", "Outros"); break;
        //Gerar dados sobre plano de saude do aluno
        case 114: GenerateData(114, "Não tenho, uso o SUS", "..others..", "Sem plano", "Com algum tipo de plano"); break;
        //Gerar dados sobre grau de escolaridade da mãe dos alunos
        case 117: GenerateData(117, "Ensino Médio", "Ensino Superior", "Ensino Médio", "Ensino Superior"); break;
        //Gerar dados sobre grau de escolaridade do pai dos alunos
        case 120: GenerateData(120, "Ensino Médio", "Ensino Superior", "Ensino Médio", "Ensino Superior"); break;
        //Gerar dados sobre tipo de escola que estudou
        case 123: GenerateData(123, "Sempre na escola pública", "..others..", "Em Escola Pública", "Outros"); break;
        //Gerar dados sobre o ingles dos alunos
        case 253: GenerateData(253, "Praticamente nulo", "Leio e escrevo mas não falo", "Praticamente nulo", "Leio e escrevo mas não falo"); break;
        //Gerar dados sobre o espanhol dos alunos
        case 256: GenerateData(256, "Praticamente nulo", "Leio e escrevo mas não falo", "Praticamente nulo", "Leio e escrevo mas não falo"); break;
        //Gerar dados sobre o outros idiomas dos alunos
        case 259: GenerateData(259, "Praticamente nulo", "Leio e escrevo mas não falo", "Praticamente nulo", "Leio e escrevo mas não falo"); break;
        //Gerar dados sobre se o aluno assiste TV
        case 264: GenerateData(264, "Nunca", "Pouco", "Nunca", "Pouco"); break;
        //Gerar dados sobre se o aluno usa internet
        case 267: GenerateData(267, "Nunca", "Pouco", "Nunca", "Pouco"); break;
        //Gerar dados sobre se o aluno lê revistas
        case 270: GenerateData(270, "Nunca", "Pouco", "Nunca", "Pouco"); break;
        //Gerar dados sobre se o aluno lê jornais
        case 273: GenerateData(273, "Nunca", "Pouco", "Nunca", "Pouco"); break;
        //Gerar dados sobre se o aluno escuta radio
        case 276: GenerateData(276, "Nunca", "Pouco", "Nunca", "Pouco"); break;
        //Gerar dados sobre se o aluno usa redes sociais
        case 279: GenerateData(279, "Nunca", "Pouco", "Nunca", "Pouco"); break;
        //Gerar dados sobre se o aluno conversa com amigos
        case 282: GenerateData(282, "Nunca", "Pouco", "Nunca", "Pouco"); break;
        //Gerar dados quantos livros o aluno lê por ano
        case 285: GenerateData(285, "Até 2", "..others..", "Até 2", "Mais de 2"); break;
        //Gerar dados sobre genero dos livros que o aluno lê
        case 288: GenerateData(288, "Não leio", "..others..", "Não leio", "Outros"); break;
        //Gerar dados sobre religião do aluno
        case 294: GenerateData(294, "Católico", "..others..", "Cátolico", "Outros"); break;
        //Gerar dados sobre fontes culturais
        case 297: GenerateData(297, "..biggest..", "..others..", "Mais usado", "Outros"); break;
        //Gerar dados sobre como ficou sabendo da FATEC
        case 300: GenerateData(300, "Indicação de familiar/amigo", "..others..", "Indicação de familiar/amigo", "Outros"); break;
        //Gerar dados sobre Por que escolheu a FATEC
        case 303: GenerateData(303, "..biggest..", "..lowest..", "Maior Valor", "Menor Valor"); break;
        //Gerar dados sobre expectativa do curso
        case 306: GenerateData(306, "..biggest..", "..lowest..", "Maior Valor", "Menor Valor"); break;
        //Gerar dados sobre expectativa após se formar
        case 309: GenerateData(309, "..biggest..", "..lowest..", "Maior Valor", "Menor Valor"); break;
        //Gerar dados se aluno já fez um curso tecnico
        case 315: GenerateData(315, "Não fiz", "..others..", "Não fiz", "Já fiz"); break;
        //Gerar dados sobre qual transporte o aluno vai para a fatec
        case 318: GenerateData(318, "Carro", "..others..", "Carro", "Outros"); break;

    }
}