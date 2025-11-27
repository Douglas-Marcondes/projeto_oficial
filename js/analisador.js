class AnalisadorTexto {
    constructor() {
        this.stopWords = [
            'o', 'a', 'e', 'de', 'do', 'da', 'em', 'um', 'uma', 
            'com', 'para', 'por', 'que', 'se', 'não', 'sim'
        ];
    }

    processar(texto) {
        console.log("Iniciando análise do texto...");
        
        // 1. Limpa o texto
        const palavras = this.limparTexto(texto);
        console.log("Palavras após limpeza:", palavras);
        
        // 2. Filtra palavras irrelevantes
        const palavrasFiltradas = this.filtrarStopWords(palavras);
        console.log("Palavras após filtro:", palavrasFiltradas);
        
        // 3. Conta frequência
        const frequencia = this.contarFrequencia(palavrasFiltradas);
        console.log("Frequência calculada:", frequencia);
        
        // 4. Ordena e retorna resultado
        const resultado = this.ordenarResultado(frequencia, palavras.length);
        console.log("Resultado final:", resultado);
        
        return resultado;
    }

    limparTexto(texto) {
        return texto
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/[^\w\s]/g, ' ') // Substitui pontuação por espaços
            .split(/\s+/) // Divide por espaços
            .filter(palavra => palavra.length > 2); // Filtra palavras muito curtas
    }

    filtrarStopWords(palavras) {
        return palavras.filter(palavra => 
            !this.stopWords.includes(palavra)
        );
    }

    contarFrequencia(palavras) {
        const frequencia = {};
        
        palavras.forEach(palavra => {
            if (palavra) { // Verifica se não é string vazia
                frequencia[palavra] = (frequencia[palavra] || 0) + 1;
            }
        });
        
        return frequencia;
    }

    ordenarResultado(frequencia, totalPalavras) {
        const palavrasArray = Object.entries(frequencia)
            .sort((a, b) => b[1] - a[1]) // Ordena por frequência (decrescente)
            .slice(0, 15) // Pega as 15 mais frequentes
            .map(([palavra, count]) => ({
                palavra,
                frequencia: count,
                porcentagem: ((count / totalPalavras) * 100).toFixed(1)
            }));

        return {
            palavras: palavrasArray,
            totalPalavras: totalPalavras,
            palavrasUnicas: Object.keys(frequencia).length
        };
    }
}