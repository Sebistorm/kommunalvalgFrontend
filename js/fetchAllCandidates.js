document.addEventListener('DOMContentLoaded', init());
let candidatesArray = {};
function init() {
  console.log("Fetch all candidates")
  initCandidateTable()
}


function initCandidateTable(){
  fetch("http://localhost:8080/candidates")
    .then(response => response.json())
    .then(result => {
      renderCandidateTable(result)
    });
}

function renderCandidateTable(data){
  candidatesArray = data;
  data.forEach(candidate => {
    insertCandidateToUI(candidate);
  });
}

function insertCandidateToUI(candidateData) {
  let candidateContainer = document.querySelector(".tableBody");
  console.log(candidateData)

  let candidate = `<div class='d-flex candidate'>
                            <div class='col-sm-2 candidateID'>${candidateData.candidateID}</div>
                            <div class='col-sm-2 candidateName'>${candidateData.candidateName}</div>
                            <div class='col-sm-2 candidateParty'>${candidateData.party.partyName}</div>
                            <div class="col-sm-2"> <a href="candidate.html/?candidate_id=${candidateData.candidateID}">View</a></div>
                            <div class="col-sm-2"> <a href="editCandidate.html/?candidate_id=${candidateData.candidateID}">Rediger</a></div>
                            <div class="col-sm-2 btnDeleteCandidate" data-id="${candidateData.candidateID}">Slet</div>
                   </div>`;
  candidateContainer.insertAdjacentHTML("beforeend", candidate);
}


// sort
document.querySelector(".sortAfterParty").addEventListener("click", function () {
  console.log("click")
  let candidates = document.querySelectorAll(".candidate");
  for (let i = 0; i < candidates.length; i++) {
    candidates[i].remove();
  }

  candidatesArray.sort(function(a, b){
    let x = a.party.partyName.toLowerCase();
    let y = b.party.partyName.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });

  console.log(candidatesArray)
  let candidateContainer = document.querySelector(".tableBody");

  for (let i = 0; i < candidatesArray.length; i++) {
    let candidate = `<div class='d-flex candidate'>
                              <div class='col-sm-2 candidateID'>${candidatesArray[i].candidateID}</div>
                              <div class='col-sm-2 candidateName'>${candidatesArray[i].candidateName}</div>
                              <div class='col-sm-2 candidateParty'>${candidatesArray[i].party.partyName}</div>
                              <div class="col-sm-2"> <a href="candidate.html/?candidate_id=${candidatesArray[i].candidateID}">View</a></div>
                              <div class="col-sm-2"> <a href="editCandidate.html/?candidate_id=${candidatesArray[i].candidateID}">Rediger</a></div>
                              <div class="col-sm-2 btnDeleteCandidate" data-id="${candidatesArray[i].candidateID}">Slet</div>
                     </div>`;
    candidateContainer.insertAdjacentHTML("beforeend", candidate);
  }

})


// Search
document.querySelector("#txtSearch").addEventListener("keyup", function (){
  document.querySelectorAll(".candidate").forEach(function (e){
    let candidateID = e.querySelector(".candidateID").textContent.toString();
    let candidateName = e.querySelector(".candidateName").textContent.toLowerCase();
    let candidateParty = e.querySelector(".candidateParty").textContent.toLowerCase();
    let searchFor = document.querySelector("#txtSearch").value.toLowerCase()
    let res = candidateID.startsWith(searchFor) || candidateName.startsWith(searchFor) || candidateParty.startsWith(searchFor)
    if(!res) {
      e.style.setProperty("display", "none", "important")
    } else {
      e.style.setProperty("display", "flex", "important")
    }
  });
})
