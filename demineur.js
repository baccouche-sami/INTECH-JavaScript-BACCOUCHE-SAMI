window.onload = function() {
    lancerJeu();

    console.log(blockJeu);
}

document.addEventListener('contextmenu', event => event.preventDefault());
var blockJeu = new Array();

var lancerJeu = function() {
    var jeu = document.getElementById("jeu");
    jeu.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        blockJeu[i] = new Array();
    }

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            jeu.innerHTML += "\
									<button style='height:40px;width:40px;' \
												id='" + i + "" + j + "' \
												data-x='" + i + "' \
												data-y='" + j + "' \
												>\
										" + "&nbsp;" + "\</button>";
            let id = i + "" + j
                //document.getElementById(i + "" + j).style.backgroundColor = '#bcbcbc';

            document.addEventListener('click', function(e) {
                if (e.target && e.target.id == id) {
                    let x = id[0]
                    let y = id[1]
                    clicBouton()
                    console.log(blockJeu[x][y]);
                    console.log(e);
                    if (e.target.innerHTML == "⚑") {
                        alert("No")
                    } else {
                        document.getElementById(id).innerHTML = blockJeu[x][y];
                    }

                    //console.log(blockJeu[i][j]);

                }
            });
            document.addEventListener('contextmenu', function(e) {
                if (e.target && e.target.id == id) {
                    document.getElementById(id).innerHTML = "&#9873;";

                    clicDroitBouton()
                }
            });


        }
        jeu.innerHTML += "<br/>";
    }

    ajouterBombes();
};
var start = document.getElementById('start');
var show = document.getElementById('show')

var stop = document.getElementById('pause');
var h1 = document.getElementsByTagName('h1')[0];
var sec = 0;
var min = 0;
var t;

function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
}

function add() {
    tick();
    h1.textContent = (min > 9 ? min : "0" + min) +
        ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

timer();
start.onclick = timer;

stop.onclick = function() {
    clearTimeout(t);
}

function clicDroitBouton() {
    console.log("Droit clic");
}

function clicBouton() {
    console.log("Clic");
}


show.onclick = function() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            document.getElementById(i + "" + j).innerHTML = blockJeu[i][j];
        }

    }
}



ajouterBombes = function() {
    var repeat = false;
    //nb de bombes 10 à changer dans niveau de jeu
    for (var i = 0; i < 10; i++) {

        while (!repeat) {
            var tx = parseInt(Math.random() * (10));
            var ty = parseInt(Math.random() * (10));
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



HuitCases = function() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (blockJeu[i][j] == undefined) {
                blockJeu[i][j] = bombeHuit(i, j)
            } else {
                blockJeu[i][j] = blockJeu[i][j]
            }
        }
    }
};

bombeHuit = function(BtnX, BtnY) {
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
    if (BtnX == 10 - 1) {
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
    if (BtnY == 10 - 1) {
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
    if (BtnX == 0 || BtnY == 10 - 1) {
        caseNb += 0
    } else if (blockJeu[BtnX - 1][BtnY + 1] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }
    //==============
    if (BtnX == 10 - 1 || BtnY == 0) {
        caseNb += 0
    } else if (blockJeu[BtnX + 1][BtnY - 1] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }
    //===================
    if (BtnX == 10 - 1 || BtnY == 10 - 1) {
        caseNb += 0
    } else if (blockJeu[BtnX + 1][BtnY + 1] == "B") {
        caseNb += 1
    } else {
        caseNb += 0
    }


    return caseNb;
};