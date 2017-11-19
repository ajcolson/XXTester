document.addEventListener("DOMContentLoaded", function(event) {
  console.warn("Something wicked this way comes...")
  var req = new Request('http://localhost:8080/echo', {method: 'POST', body: '{XSS}'})

  fetch(req).then(function(resp) {
    if(resp.status == 200){
      resp.text().then(function(text){
        textPayload(text)
        attr(text)
        evalPayload(text)
        timeoutPayload(text)
      })
    }
    else throw new Error('I think I broke something....');

  }).catch(function(error) {
    console.error(error)
  })

  function textPayload(payload) {
    var output = document.querySelector("#text")
    output.innerHTML = payload
  }

  function attr(payload) {
    var output = document.querySelector("#attr")
    output.innerHTML = '<a href="' + payload + '" >test</a>'
  }

  function evalPayload(payload) {
    eval('"eval test" + "' + payload + '"')
  }

  function timeoutPayload(payload) {
    setTimeout('"setTimeout test" + "' + payload + '"', 10)
  }

});
