document.addEventListener('DOMContentLoaded', init());

function init() {
  console.log("Fetch Parties")
  initCandidateSelect();
}

// fetch categories - Select i html'en
function initCandidateSelect(){
  fetch("http://localhost:8080/parties")
    .then(response => response.json())
    .then(result => renderPartiesSelect(result));
}

function renderPartiesSelect(result) {
  result.forEach(party => {
    insertCandidateToUI(party);
  });
}

function insertCandidateToUI(data) {
  let selectContainer = document.querySelector("#sltParty");
  let option_item = `<option class="option" value="${data.partyID}">${data.partyName}</option>`;
  selectContainer.insertAdjacentHTML("beforeend", option_item);
}
