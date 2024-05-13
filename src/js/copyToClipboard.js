var clipboard = new ClipboardJS(".btn-copiar", {
  target: function (trigger) {
    return trigger.previousElementSibling;
  },
});

clipboard.on("success", function (e) {
  e.clearSelection();
  console.log("Texto copiado: ", e.text);

  var aviso = document.createElement("span");
  aviso.innerHTML = "Texto copiado!";
  aviso.classList.add("aviso-popup");

  document.body.appendChild(aviso);

  setTimeout(function () {
    aviso.parentNode.removeChild(aviso);
  }, 3000);
});
