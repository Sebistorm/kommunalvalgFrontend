document.addEventListener('DOMContentLoaded', init());

let partiesArray = {}
let numbersOfVotes;
function init() {
  fetchTotalNumberOfVotes();
  console.log("Fetch Parties")
  initGetParties();
  initGetTopFiveCandidates();
}


function initGetParties(){
  fetch("http://localhost:8080/parties")
    .then(response => response.json())
    .then(result => getVotes(result));
}

function getVotes(result) {
  partiesArray = result;
  console.log(partiesArray)


  fetch("http://localhost:8080/getPartyVotesTotal")
    .then(response => response.json())
    .then(result => sortPartiesArray(result));

}

function insertPartyToUI(data) {
  console.log(data)
  let percentage = calcVotesPercentage(data.numberOfVotes);
  let tableBody = document.querySelector(".tableBody");
  let party = `    <div class="party d-flex align-items-center">
                            <p class="col-sm-5"><span class="partySymbol">${data.partySymbol}</span><a href="party.html?party_id=${data.partyID}"><span class="partyName">${data.partyName}</span></a></p>
                            <p class="col-sm-2 voteCount">${data.numberOfVotes}</p>
                            <div class="col-sm-5 d-flex justify-content-around">
                              <div class="progressContainer col-sm-9">
                                <div class="myProgress" style="width:${percentage}%"></div>
                              </div>
                              <div class="col-sm-2">${percentage}% </div>
                            </div>
                          </div>`;
  tableBody.insertAdjacentHTML("beforeend", party);


}


function sortPartiesArray(data) {
  //console.log(data);
  for (let i = 0; i < data.length; i++) {
    for(let k = 0; k < partiesArray.length; k++) {
      if(partiesArray[k].partyID == data[i][0]) {
        partiesArray[k].numberOfVotes = data[i][1]
      }
    }
  }

  // sort array desc
  partiesArray.sort((a, b) => {
    return  b.numberOfVotes - a.numberOfVotes
  });

  partiesArray.forEach(party => {
    insertPartyToUI(party);
  });

}

function fetchTotalNumberOfVotes() {
  fetch("http://localhost:8080/getVotesTotal")
    .then(response => response.json())
    .then(function (result) {
      numbersOfVotes = result;
    });
}

function calcVotesPercentage(votes) {
  let percentage = votes / numbersOfVotes * 100;
  //console.log(Math.round(percentage));
  return Math.round(percentage);
}

function initGetTopFiveCandidates() {
  fetch("http://localhost:8080/getTopFiveCandidates")
    .then(response => response.json())
    .then(result => insertCandidateToUI(result));
}

function insertCandidateToUI(data) {
  console.log(data);
  let tableBody = document.querySelector(".candidateTableBody");
  for (let i = 0; i < data.length; i++) {
    console.log("create")
    let percentage = calcVotesPercentage(data[i].numberOfVotes);
    let candidate = `    <div class="candidate d-flex flex-column">
                            <div class="candidateText"><span class="partySymbol">(${data[i].party.partySymbol})</span><span class="candidateName">${data[i].candidateName}</span>, Samsø</div>
                            <div class="d-flex justify-content-around align-items-center">
                              <div class="progressContainer w-75">
                              <div class="myProgress" style="width:${percentage}%"></div>
                            </div>
                            <div class="w-20">${percentage}%</div>
                            </div>
                         </div>`;
    tableBody.insertAdjacentHTML("beforeend", candidate);
  }
}
