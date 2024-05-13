let options = [];

function addOption() {
    const option = document.getElementById('option').value.trim();
    if (option === '') {
        alert('Não é possível adicionar em branco!');
        return;
    }
    options.push(option);
    document.getElementById('option').value = '';
    renderOptions();
    updateJSON();
    document.getElementById('option').focus();

    const optionsContainer = document.getElementById('options');
    optionsContainer.scrollTop = optionsContainer.scrollHeight;
}

document.getElementById('option').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addOption();
    }
});

function removeOption(index) {
    options.splice(index, 1);
    renderOptions();
    updateJSON();
}

function renderOptions() {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    options.forEach((option, index) => {
        const div = document.createElement('div');
        div.classList.add('optionContainer');
        const span = document.createElement('span');
        span.textContent = option;
        span.classList.add('optionJson');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('buttonRemove');
        removeButton.onclick = () => removeOption(index);
        div.appendChild(span);
        div.appendChild(removeButton);
        optionsContainer.appendChild(div);
    });

    // Rolar para baixo
    optionsContainer.scrollTop = optionsContainer.scrollHeight;
}

function updateJSON() {
    document.getElementById('json').value = JSON.stringify(options, null, 2);
}

function downloadJSON() {
    const fileNameInput = document.getElementById('fileName');
    let fileName = fileNameInput.value.trim();
    if (fileName === '') {
        alert('Por favor, preencha o campo Nome do Arquivo.');
        return;
    }
    if (fileName.includes('/')) {
        alert('O nome do arquivo não pode conter o caractere "/".');
        return;
    }

    const data = JSON.stringify(options, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
