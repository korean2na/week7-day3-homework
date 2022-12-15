const standingsEl = document.getElementById('standings') 
const getBtn = document.getElementById('getStandings')

let standings = []

function showStandings() {
    if (standingsEl) {
        standingsEl.innerHTML = ''
    }

    const keyRowEl = document.createElement('div')
    keyRowEl.classList.add('card', 'mx-5', 'ps-4','pt-2', 'bg-primary', 'text-white')

    keyRowEl.innerHTML = `
        <div class="card-body row justify-content-between">
            <div class="col-1">
                <p><strong>Position</strong></p>
            </div>
            <div class="col-3">
                <p><strong>Name</strong></p>
            </div>
            <div class="col-1">
                <p><strong>Number</strong></p>
            </div>
            <div class="col-2">
                <p><strong>Nationality</strong></p>
            </div>
            <div class="col-2">
                <p><strong>Sponsor</strong></p>
            </div>
            <div class="col-1">
                <p><strong>Points</strong></p>
            </div>
            <div class="col-1">
                <p><strong>Wins</strong></p>
            </div>
        </div>
    `
    standingsEl.appendChild(keyRowEl)

    for (i=0; i<7; i++) {
        const currStanding = `
            <div class="card mx-5 ps-4 pt-2">
                <div class="card-body row justify-content-between">
                    <div class="col-1">
                        <p>${standings[i].position}</p>
                    </div>
                    <div class="col-3">
                        <p><a href="${standings[i].Driver.url}" target="_blank">${standings[i].Driver.givenName} ${standings[i].Driver.familyName}</a></p>
                    </div>
                    <div class="col-1">
                        <p>${standings[i].Driver.permanentNumber}</p>
                    </div>
                    <div class="col-2">
                        <p>${standings[i].Driver.nationality}</p>
                    </div>
                    <div class="col-2">
                        <p><a href="${standings[i].Constructors[0].url}" target="_blank">${standings[i].Constructors[0].name}</a></p>
                    </div>
                    <div class="col-1">
                        <p>${standings[i].points}</p>
                    </div>
                    <div class="col-1">
                        <p>${standings[i].wins}</p>
                    </div>
                </div>
            </div>
        `
        standingsEl.innerHTML += currStanding
    }
}

const standingsFormEl = document.getElementById('standingsForm')
standingsFormEl.addEventListener('submit', (e) => {
    e.preventDefault()

    let seasonInput = document.getElementsByName('season')[0]
    let roundInput = document.getElementsByName('round')[0]

    axios.get(`https://ergast.com/api/f1/${seasonInput.value}/${roundInput.value}/driverStandings.json`)
    .then((data) => {
        standings = data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        showStandings()
    })
})
