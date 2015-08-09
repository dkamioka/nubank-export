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
  var result = [["categoria", "loja", "valor", "data", "tags"]];
  var a = document.querySelectorAll("div.event-card.transaction")
  for (var i = 0; i < a.length; i++) {
    console.log(i);
    var categoria = a[i].querySelector("span.title").textContent;
    var loja = a[i].querySelector("h4.description").textContent;
    var valor = a[i].querySelector("div.amount").textContent.replace(/[^0-9-,]/g, '').replace(",",".");
    var data = a[i].querySelector("span.time").textContent;

    var resultTag = a[i].querySelectorAll("span.tag");
    var tags = [];
    if (resultTag) {
      for (var j = 0; j < resultTag.length; j++) {
        tags.push(resultTag[j].textContent);
      }
    }
    result.push([categoria, loja, valor, data, tags.join('|')]);
  }
  var csvContent = "data:text/csv;charset=utf-8,";
  result.forEach(function(infoArray, index){

    resultString = infoArray.join(",");
   csvContent += index < result.length ? resultString+ "\n" : resultString;

 });
 var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
// acha o período selecionado para usar de nome do arquivo
var periodo = document.querySelector('div #timeChart span.filter').textContent.replace(/ /g,'');
link.setAttribute("download", periodo + ".csv");

link.click(); // This will download the data file named "my_data.csv".
}
