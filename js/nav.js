document.addEventListener('DOMContentLoaded', initNavbar());

function initNavbar() {
  navbar()
}

function navbar() {
  const nav = document.querySelector("#navbar");
  const navbar = `<div class="topnav d-flex container">
                    <a href="/kommunalvalgFrontend/index.html">
                      <div class="logoWrapper">
                        <i class="fas fa-person-booth"></i>
                        <p>kommunalvalg</p>
                      </div>
                    </a>
                    <div class="aLinksWrapper">
                      <a class="whiteFlicker" href="/kommunalvalgFrontend/index.html" class="">Forside</a>
                      <a class="yellowFlicker" href="/kommunalvalgFrontend/createCandidate.html">Opret Kandidat</a>
                      <a class="greenFlicker" href="/kommunalvalgFrontend/candidates.html">Kandidater</a>
                    </div>
                  </div>`;
  nav.insertAdjacentHTML("afterbegin", navbar);
}
