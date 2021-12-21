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

  document.querySelector(".candidateName").value = data.candidateName;
  document.querySelector(".numberOfVotes").value = data.numberOfVotes;
  let option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    if (option[i].value == data.party.partyID) {
      option[i].setAttribute("selected", "selected");
    }
  }
}


document.querySelector("#frmEditCandidate").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = document.querySelector("#frmEditCandidate");
  const id = getID();
  const url = "http://localhost:8080/candidate/"+id;

  try {
    let CandidateObject = {};

    CandidateObject.candidateName = form.candidateName.value;
    CandidateObject.numberOfVotes = form.numberOfVotes.value;
    CandidateObject.party = {};
    CandidateObject.party.partyID = form.partyID.value;


    let candidateObjectString = JSON.stringify(CandidateObject);

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: candidateObjectString
    }

    const response = await fetch(url, fetchOptions)

    if(!response.ok) {
      console.log("Det gik ikke så godt")
    } else {
      document.querySelector(".msg").innerHTML = "Informationerne er opdateret. Du vil blive ledt tilbage til den forrige side om 3 sek."
      setTimeout(function () {
        location.href = "candidates.html";
      }, 3000)
    }

  } catch (error) {
    alert(error)
    console.log(error)
  }
})
