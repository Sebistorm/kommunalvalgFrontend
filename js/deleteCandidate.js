document.addEventListener('click',async function(e){
  if(e.target && e.target.classList.contains("btnDeleteCandidate")){
    console.log("dynamisk knap")
    const id = e.target.getAttribute("data-id")
    const url = "http://localhost:8080/candidate/" + id;
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: ""
    }

    for (let i = 0; i < candidatesArray.length; i++ ) {
      if(candidatesArray[i].candidateID == e.target.getAttribute("data-id")) {
        candidatesArray.splice(i, 1)
      }
    }



    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      console.log("Det fik ikke godt")
    }
    if (response.ok) {
      console.log("kandidat slettet")
      let candidateDiv = e.target.parentElement;
      candidateDiv.remove();

    }


  }
});
