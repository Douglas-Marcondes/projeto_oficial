// Cria uma instância do analisador
const analisador = new AnalisadorTexto();

function analisarTexto() {
    // Pega o texto da textarea
    const textoInput = document.getElementById('texto-input');
    const texto = textoInput.value.trim();
    
    // Verifica se tem texto
    if (!texto) {
        alert('Por favor, digite ou cole um texto para analisar.');
        return;
    }
    
    console.log("Texto recebido:", texto);
    
    // Processa o texto
    const resultado = analisador.processar(texto);
    
    // Mostra os resultados
    mostrarResultados(resultado);
}

function mostrarResultados(resultado) {
    console.log("Mostrando resultados:", resultado);
    
    // Atualiza estatísticas
    const estatisticas = document.getElementById('estatisticas');
    estatisticas.innerHTML = `
        <h3>📈 Estatísticas do Texto</h3>
        <p><strong>Total de palavras:</strong> ${resultado.totalPalavras}</p>
        <p><strong>Palavras únicas:</strong> ${resultado.palavrasUnicas}</p>
        <p><strong>Diversidade lexical:</strong> ${((resultado.palavrasUnicas / resultado.totalPalavras) * 100).toFixed(1)}%</p>
    `;
    
    // Atualiza lista de palavras frequentes
    const palavrasContainer = document.getElementById('palavras-frequentes');
    palavrasContainer.innerHTML = `
        <h3>🔝 Palavras Mais Frequentes</h3>
        ${resultado.palavras.map((item, index) => `
            <div class="palavra-item">
                <span class="palavra">${index + 1}. ${item.palavra}</span>
                <span class="frequencia">${item.frequencia} (${item.porcentagem}%)</span>
            </div>
        `).join('')}
    `;
    
    // Mostra a seção de resultados
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.classList.remove('hidden');
    
    console.log("Resultados exibidos com sucesso!");
}

// Teste automático (opcional - pode remover depois)
function testeAutomatico() {
    const textoTeste = `O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo. 
    Mesmo não atingindo o alvo, quem busca e vence obstáculos, no mínimo fará coisas admiráveis.`;
    
    document.getElementById('texto-input').value = textoTeste;
    console.log("Texto de teste inserido automaticamente");
}

// Executa teste quando a página carrega
window.onload = testeAutomatico;