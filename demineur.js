// Initialiser Le Jeu Par Défaut
window.onload = function() {
    LancerPartie()
}



// Desactive Event par default Click Droite
document.addEventListener('contextmenu', event => event.preventDefault());


// Variables

var nbX = 10
var nbY = 10
var nbBombee = 2

var firstTime = true

var LoadingJeu = false;

// Crono Variables
var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0

// Array de Jeu 
var blockJeu = new Array();
var testBlockJeu = new Array();

// Functions

//RemplirVide

// Permet de Lancer une Partie ou Rejouer (Reset Jeu & Crono)
function LancerPartie() {


    chronoReset()
    let niveau = document.getElementById("niveau").value
        //let nbBombee
    switch (niveau) {
        case "F":
            nbBombee = 2
            break;
        case "M":
            nbBombee = 10
            break;
        case "D":
            nbBombee = 50
            break;
        case "S":
            nbBombee = 100
            break;
        default:
            nbBombee = 2
            break;
    }
    lancerJeu(nbX, nbY, nbBombee);
    LoadingJeu = true
}


function lancerJeu(nbX, nbY, nbBombe) {
    var jeu = document.getElementById("jeu");
    jeu.innerHTML = "";
    for (var i = 0; i < nbX; i++) {
        blockJeu[i] = new Array();
        testBlockJeu[i] = new Array();
    }
    for (var i = 0; i < nbX; i++) {
        for (var j = 0; j < nbY; j++) {
            jeu.innerHTML += "\
									<button style='height:40px;width:40px;' \
												id='" + i + "" + j + "' \
												data-x='" + i + "' \
												data-y='" + j + "' \
												>\
										" + "&nbsp;" + "\</button>";
            let id = i + "" + j

            document.addEventListener('click', function(e) {
                let x = e.target.dataset.x
                let y = e.target.dataset.y
                if (e.target && e.target.id == id) {
                    if (e.target.innerHTML == "⚑") {
                        console.log("No Action");
                    } else {
                        clicBouton(x, y)
                    }
                }
            });
            document.addEventListener('contextmenu', function(e) {
                if (e.target && e.target.id == id) {
                    let x = e.target.dataset.x
                    let y = e.target.dataset.y
                    clicDroitBouton(id, x, y)
                }
            });


        }
        jeu.innerHTML += "<br/>";
    }

    ajouterBombes(nbBombe);
};






function clicDroitBouton(id, x, y) {
    console.log("Droit clic");
    if (LoadingJeu && testBlockJeu[x][y] != "0") {
        var elt = document.getElementById(x + "" + y);
        if (testBlockJeu[x][y] == "D") {
            testBlockJeu[x][y] = "NULL";
            elt.innerHTML = "&nbsp;";
        } else if (testBlockJeu[x][y] == "NULL") {
            testBlockJeu[x][y] = "D";
            elt.innerHTML = "⚑";
        }
        chronoContinue()

        WinOrLose()

    }


}

function clicBouton(x, y) {
    if (LoadingJeu) {
        RClicBtn(x, y)
        chronoContinue()

    }
    WinOrLose()
}

function RClicBtn(Btnx, Btny) {
    let x = parseInt(Btnx)
    let y = parseInt(Btny)

    console.log(x);
    console.log(y);

    if (x >= 0 && y >= 0 && x < nbX && y < nbY && testBlockJeu[x][y] == "NULL") {
        testBlockJeu[x][y] = "OK"
        let id = x + "" + y

        console.log(id);
        document.getElementById(id).innerHTML = blockJeu[x][y];
        document.getElementById(id).style.backgroundColor = '#bcbcbc';

        console.log(testBlockJeu);
        if (blockJeu[x][y] == 0) {
            RClicBtn(x - 1, y);

            RClicBtn(x + 1, y);

            RClicBtn(x, y - 1);

            RClicBtn(x, y + 1);

            RClicBtn(x - 1, y - 1);

            RClicBtn(x - 1, y + 1);

            RClicBtn(x + 1, y - 1);

            RClicBtn(x + 1, y + 1);

        } else if (blockJeu[x][y] == "B") {
            document.getElementById(x + "" + y).style.backgroundColor = "red";
            showAll()
            document.getElementById("perdu").style.display = ""
            LoadingJeu = false;
            chronoStop()
            clearTimeout(timerID)

        }

    }

}


function ajouterBombes(nbBombe) {
    var repeat = false;
    for (var i = 0; i < nbBombe; i++) {

        while (!repeat) {
            var tx = parseInt(Math.random() * (nbX));
            var ty = parseInt(Math.random() * (nbY));
            console.log(blockJeu[tx][ty]);
            if (blockJeu[tx][ty] == undefined) {
                blockJeu[tx][ty] = "B";

                repeat = true;
            }
        }

        repeat = false;
    }

    HuitCases();
};



function HuitCases() {
    for (var i = 0; i < nbX; i++) {
        for (var j = 0; j < nbY; j++) {


            if (blockJeu[i][j] == undefined) {
                blockJeu[i][j] = bombeHuit(i, j)
            } else {
                blockJeu[i][j] = blockJeu[i][j]
            }
            testBlockJeu[i][j] = "NULL";


        }
    }
};

function bombeHuit(BtnX, BtnY) {
    var caseNb = 0;

    //==================
    if (BtnX == 0) {
        caseNb += 0
    } else if (blockJeu[BtnX - 1][BtnY] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }
    //==========
    if (BtnX == nbX - 1) {
        caseNb += 0
    } else if (blockJeu[BtnX + 1][BtnY] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }
    //==============
    if (BtnY == 0) {
        caseNb += 0
    } else if (blockJeu[BtnX][BtnY - 1] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }
    //=================
    if (BtnY == nbY - 1) {
        caseNb += 0
    } else if (blockJeu[BtnX][BtnY + 1] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }
    //============
    if (BtnX == 0 || BtnY == 0) {
        caseNb += 0
    } else if (blockJeu[BtnX - 1][BtnY - 1] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }
    //================
    if (BtnX == 0 || BtnY == nbY - 1) {
        caseNb += 0
    } else if (blockJeu[BtnX - 1][BtnY + 1] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }
    //==============
    if (BtnX == nbX - 1 || BtnY == 0) {
        caseNb += 0
    } else if (blockJeu[BtnX + 1][BtnY - 1] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }
    //===================
    if (BtnX == nbX - 1 || BtnY == nbY - 1) {
        caseNb += 0
    } else if (blockJeu[BtnX + 1][BtnY + 1] == "B") {
        caseNb += 1
    } else {
        caseNb += 0

    }
    return caseNb;

};

function WinOrLose() {
    console.log(testBlockJeu);
    for (var i = 0; i < nbX; i++) {
        for (var j = 0; j < nbY; j++) {
            if (testBlockJeu[i][j] == "NULL" || (testBlockJeu[i][j] == "D" && blockJeu[i][j] != "B") || (testBlockJeu[i][j] == "OK" && blockJeu[i][j] == "B")) {
                return false;
            }
        }
    }
    chronoStop()
    document.getElementById("win").style.display = ""
    clearTimeout(timerID)
        //alert("OLaaaaaaaaaaaaaaaaaa Tu as gagné");
    LoadingJeu = false;
}

function showAll() {
    for (let i = 0; i < nbX; i++) {
        for (let j = 0; j < nbY; j++) {
            document.getElementById(i + "" + j).innerHTML = blockJeu[i][j];
            if (blockJeu[i][j] == "B") {
                document.getElementById(i + "" + j).style.backgroundColor = "red";
            }
        }

    }
    chronoStop()
}

document.getElementById("show").addEventListener("click", showAll);


//Functions de Crono

function chrono() {
    end = new Date()
    diff = end - start
    diff = new Date(diff)
    var sec = diff.getSeconds()
    var min = diff.getMinutes()
    var hr = diff.getHours() - 1
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }
    document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec
    timerID = setTimeout("chrono()", 10)
}

function chronoStart() {
    document.chronoForm.startstop.value = "Pause"
    document.chronoForm.startstop.onclick = chronoStop
    document.chronoForm.reset.onclick = chronoReset
    start = new Date()
    chrono()
}

function chronoContinue() {
    document.chronoForm.startstop.value = "Pause"
    document.chronoForm.startstop.onclick = chronoStop
    start = new Date() - diff
    start = new Date(start)
    chrono()
}

function chronoReset() {
    document.getElementById("chronotime").innerHTML = "0:00:00"
    start = new Date()
}


function chronoStop() {
    document.chronoForm.startstop.value = "Resume"
    document.chronoForm.startstop.onclick = chronoContinue
    console.log(timerID);
    clearTimeout(timerID)
}