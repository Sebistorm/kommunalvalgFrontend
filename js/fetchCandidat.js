document.addEventListener('DOMContentLoaded', init());


function init() {
  console.log("Get 1 candidate")
  fetchData()
}
function getID() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('candidate_id');
}

function fetchData() {
  let id = getID();
  console.log(id);
  fetch(`http://localhost:8080/candidate/`+id)
    .then(response => response.json())
    .then(result => setData(result));
}

function setData(data){

  console.log(data);
  document.querySelector(".candidateID").innerHTML = data.candidateID;
  document.querySelector(".candidateName").innerHTML = data.candidateName;
  document.querySelector(".candidateParty").innerHTML = data.party.partyName;
  document.querySelector(".numberOfVotes").innerHTML = data.numberOfVotes;
}
