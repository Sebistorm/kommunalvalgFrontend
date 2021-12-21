document.addEventListener('DOMContentLoaded', init());


function init() {
  console.log("Get all candidates from a party")
  fetchData()
}
function getID() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('party_id');
}

function fetchData() {
  let id = getID();
  console.log(id);
  fetch(`http://localhost:8080/candidates/`+id)
    .then(response => response.json())
    .then(result => setData(result));
}

function setData(data) {
  console.log(data);
  document.querySelector(".partyName").innerHTML = "("+data[0].party.partySymbol+")"+ " " + data[0].party.partyName
  let candidateContainer = document.querySelector(".tableBody");

  for(let i = 0; i < data.length; i++) {
    let candidate = `<div class='d-flex candidate justify-content-around'>
                            <div class='col-sm-2'>${data[i].candidateID}</div>
                            <div class='col-sm-2'>${data[i].candidateName}</div>
                            <div class='col-sm-2'>${data[i].numberOfVotes}</div>
                   </div>`;
    candidateContainer.insertAdjacentHTML("beforeend", candidate);
  }
}
