// Função para converter uma string para o formato "sentence case"
function toSentenceCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Função para corrigir espaços nos nomes dos arquivos
function corrigirEspacos(str) {
    return str.replace(/%20/g, ' ');
}

// Função para corrigir caracteres especiais nos nomes dos arquivos
function corrigirCaracteresEspeciais(str) {
    return decodeURIComponent(str);
}

// Função para carregar opções no select
function carregarOpcoesSelect() {
    // Pasta onde estão os arquivos
    const pasta = 'src/assets/collections';

    // Busca por arquivos na pasta
    fetch(pasta)
        .then(response => response.text())
        .then(text => {
            // Parseia o texto como HTML para acessar os links
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, 'text/html');
            const links = Array.from(htmlDocument.links);

            // Filtra apenas os arquivos (exclui pastas)
            const arquivos = links.filter(link => link.pathname.split('/').pop().includes('.json'));

            // Adiciona os nomes dos arquivos como opções no select
            const select = document.getElementById('filterCollections');
            arquivos.forEach(arquivo => {
                let nomeArquivo = arquivo.pathname.split('/').pop().replace('.json', '');
                nomeArquivo = nomeArquivo.replace('.preview', ''); // Removendo o ".preview"
                nomeArquivo = corrigirEspacos(nomeArquivo); // Corrigindo espaços
                nomeArquivo = corrigirCaracteresEspeciais(nomeArquivo); // Corrigindo caracteres especiais
                const option = document.createElement('option');
                option.value = nomeArquivo;
                option.textContent = toSentenceCase(nomeArquivo); // Convertendo para sentence case
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar opções do select:', error));
}

// Chama a função para carregar as opções ao carregar a página
carregarOpcoesSelect();
