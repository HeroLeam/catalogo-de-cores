function toSentenceCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function corrigirEspacos(str) {
    return str.replace(/%20/g, ' ');
}

function corrigirCaracteresEspeciais(str) {
    return decodeURIComponent(str);
}

function carregarOpcoesSelect() {
    const pasta = 'src/assets/collections';

    fetch(pasta)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, 'text/html');
            const links = Array.from(htmlDocument.links);
            const arquivos = links.filter(link => link.pathname.split('/').pop().includes('.json'));
            const select = document.getElementById('filterCollections');

            arquivos.forEach(arquivo => {
                let nomeArquivo = arquivo.pathname.split('/').pop().replace('.json', '');
                nomeArquivo = nomeArquivo.replace('.preview', '');
                nomeArquivo = corrigirEspacos(nomeArquivo);
                nomeArquivo = corrigirCaracteresEspeciais(nomeArquivo);
                const option = document.createElement('option');
                option.value = nomeArquivo;
                option.textContent = toSentenceCase(nomeArquivo);
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar opções do select:', error));
}

carregarOpcoesSelect();