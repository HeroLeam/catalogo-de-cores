function search() {
  var inputText = document.getElementById("searchInput").value.toLowerCase();
  var searchTerms = inputText.split(",").map((term) => term.trim());

  var filtroCor = document.getElementById("filterColors").value.toLowerCase();
  var cartelas = document.querySelectorAll('.lista-cartela > div');

  for (var i = 0; i < cartelas.length; i++) {
    var cartela = cartelas[i];
    var codigo = cartela.getElementsByTagName("h2")[0].innerText.toLowerCase();
    var cor = cartela.getElementsByClassName("linha")[0].innerText.toLowerCase();
    var nomeCor = cartela.getElementsByClassName("linha")[1].innerText.toLowerCase();
    var codBase = cartela.getElementsByClassName("linha")[2].innerText.toLowerCase();
    var hex = cartela.getElementsByClassName("linha")[4].innerText.toLowerCase();

    var corTexto = cor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var nomeCorTexto = nomeCor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var codBaseTexto = codBase.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var codigoTexto = codigo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var hexTexto = hex.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    var correspondePesquisaTermo = searchTerms.some((term) => corTexto.includes(term) || nomeCorTexto.includes(term) || codBaseTexto.includes(term) || codigoTexto.includes(term) || hexTexto.includes(term));

    var correspondeFiltro = !filtroCor || filtroCor === "nenhum" || corTexto.includes(filtroCor) || nomeCorTexto.includes(filtroCor) || codBaseTexto.includes(filtroCor) || codigoTexto.includes(filtroCor) || hexTexto.includes(filtroCor);

    cartela.style.display = correspondePesquisaTermo && correspondeFiltro ? "flex" : "none";
  }
}
