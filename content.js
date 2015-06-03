chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello") {
      getData();
      sendResponse({farewell: "goodbye"});
    }
  });

function getData() {
  var result = [["categoria", "loja", "valor", "data"]];
  var a = document.querySelectorAll("div.event-card")
  for (var i = 0; i < a.length; i++) {
    console.log(i);
    var categoria = a[i].querySelector("span.title").textContent;
    if (categoria != "Fatura paga") {
      var loja = a[i].querySelector("h4.description").textContent;
      var valor = a[i].querySelector("div.amount").textContent.replace(/[^0-9-,]/g, '').replace(",",".");
      var data = a[i].querySelector("span.time").textContent;
      result.push([categoria, loja, valor, data]);
    }
  }
  var csvContent = "data:text/csv,";
  result.forEach(function(infoArray, index){

    resultString = infoArray.join(",");
   csvContent += index < result.length ? resultString+ "\n" : resultString;

 });
 var encodedUri = encodeURI(csvContent);
window.open(encodedUri); 
}