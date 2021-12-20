document.addEventListener('DOMContentLoaded', init());

function init() {
  console.log("Javascript for create candidate")
}

document.querySelector("#frmCreateCandidate").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = document.querySelector("#frmCreateCandidate")
  const createUrl = form.action;
  try {

    let CandidateObject = {};

    CandidateObject.candidateName = form.candidateName.value;
    CandidateObject.party = {};
    CandidateObject.party.partyID = form.partyID.value;


    let candidateObjectString = JSON.stringify(CandidateObject);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: candidateObjectString
    }

    const response = await fetch(createUrl, fetchOptions);
    if(!response.ok) {
      console.log('Error >:(')
      document.querySelector(".msg").innerHTML = "Der skete en fejl ved opretningen kandidaten";
    }

    if (response.ok) {
      document.querySelector(".msg").innerHTML = form.candidateName.value + " Blev oprettet i systemet"
      document.querySelector("#frmCreateCandidate").reset();
    }

  } catch (error) {
    alert(error)
    console.log(error)
  }
})
