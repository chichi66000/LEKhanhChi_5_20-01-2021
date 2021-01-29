/* Récupérer les information sur serveur localhost*/
let info = new XMLHttpRequest();
info.onreadystatechange = function () {
    if ( this.readyState == XMLHttpRequest.DONE && this.status ==200) {
        var response = JSON.parse(this.responseText);
    };
}
info.open('GET', 'http://localhost:3000/api/teddies');
info.send();

info.onload = function() {
    if(info.status !=200) {
        alert("erreur: " + info.status + ":" + info.statusText)
    }
}
info.onerror = function() {
    alert("requete a échoué");
} // tester ok 

/* Page produit_ours: prendre les informations du response et charger sur les éléments du page panier */

let ours = document.querySelectorAll('.ours');
ours.forEach( function(item) {
    item.addEventListener ('click', chargement);
    function chargement () {
        for (let i = 0; i<ours.length; i++) {
                ours[i] = response[i];
                let photo_ours = document.getElementById("photo_ours");
                photo_ours.src = response[i].imageUrl;
        }
    }
})















