document.getElementById('colorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var colorCode = document.getElementById('colorCode').value.toUpperCase();
    var colorName = document.getElementById('colorName').value;
    var colorDescription = document.getElementById('colorDescription').value;
    var baseCode = document.getElementById('baseCode').value;
    var hexCode = document.getElementById('hexCode').value;
    var pagPantone = document.getElementById('pantone').value;
    var sublimation = document.getElementById('sublimation').value;
    var rgbCode = hexToRGB(hexCode);
    var hexCode = document.getElementById('hexCode').value;
    var colorText = calculateTextColor(hexCode);


    var html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${colorCode}</title>
        <style>
            .${colorCode} {
                background-color: #${hexCode};
            }
        </style>
    </head>
    
    <body>
        <div class="cartela ${colorCode}">
            <h2 class="codigo" style="color: ${colorText};">${colorCode}</h2>
            <div class="linha"><span class="descricao">Cor:&nbsp;</span>${colorName}</div>
            <div class="linha"><span class="descricao">Descrição:&nbsp;</span>${colorDescription}</div>
            <div class="linha"><span class="descricao">Cod. Base:&nbsp;</span>
                <div id="copiar">${baseCode}</div>
                <button class="btn-copiar">
                    <img class="iconecopiar" src="./src/img/iconCopy.svg" alt="Imagem de um ícone que representa cópia" />
                </button>
            </div>
            <div class="linha"><span class="descricao">RGB:&nbsp;</span>${rgbCode}</div>
            <div class="linha"><span class="descricao">Hex:&nbsp;</span>#
                <div id="copiar">${hexCode}</div>
                <button class="btn-copiar">
                    <img class="iconecopiar" src="./src/img/iconCopy.svg" alt="Imagem de um ícone que representa cópia" />
                </button>
            </div>
            <div class="linha"><span class="descricao">Pág. Pantone:&nbsp;</span>${pagPantone}</div>
            <div class="linha"><span class="descricao">Célula Subli:&nbsp;</span>${sublimation}</div>
            <button class="btn-salvar" onclick="gerarimagem(this)">
                <img class="iconesalvar" src="./src/img/iconImage.svg" alt="Imagem de um ícone que representa uma imagem">
            </button>
        </div>
    </body>
    
    </html>
    `;

    var blob = new Blob([html], { type: 'text/html' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = colorCode + '.html';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

});

function hexToRGB(hex) {
    if (hex.charAt(0) === "#") {
        hex = hex.slice(1);
    }
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + " - " + g + " - " + b;
}

function calculateTextColor(hex) {
    if (!hex || hex === "") {
        return "black";
    }

    if (hex.charAt(0) === "#") {
        hex = hex.slice(1);
    }

    var bigint = parseInt(hex, 16);
    if (isNaN(bigint)) {
        return "black";
    }

    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    var luminance = 0.2126 * r / 255 + 0.7152 * g / 255 + 0.0722 * b / 255;
    var colorText = luminance > 0.35 ? "black" : "white";

    return colorText;
}
