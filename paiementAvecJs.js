
        // charger la page paiement.html avec les éléments du localStorage;
        
        function displayCart() {
            let cartItems = localStorage.getItem('productInCart'); // on récupère les produits dans localstorage
            cartItems = JSON.parse(cartItems);
            let productContainer = document.getElementById('chargementPanier');
            let productTotal = document.getElementById('tfoot');

            let cartCost = localStorage.getItem('totalCost'); // la somme total des articles
            cartCost = parseInt(cartCost);

            if( cartItems && productContainer ) { // s'il y a le contenu dans le storage et aussi on est sur la page paiement
               
                Object.values(cartItems).map(item => {
                    let tr = document.createElement('tr');

                    let td1 = document.createElement('td');
                        td1.setAttribute('class','col-md-2 produit_paiement')
                
                    let img = document.createElement('img');
                        img.setAttribute('class', 'img-fluid img-thumbnail')
                        img.setAttribute('src',`${ item.photo}`)
                    td1.appendChild(img)

                    let td2 = document.createElement('td');
                        td2.setAttribute('class','col-2')
                        td2.innerHTML= item.name;

                    let td3 = document.createElement('td');
                         td3.setAttribute('class','col-1')
                    
                    let i1 = document.createElement('i');
                        i1.addEventListener('click',() => addition(item));
                        i1.setAttribute('class','fas fa-plus-circle addition');
                    td3.append(i1);

                    let span = document.createElement('span');
                        span.setAttribute('class','quantity');
                        span.setAttribute('id',item.id);
                        span.innerHTML = item.inCart ;
                    td3.append(span);

                    let i2 = document.createElement('i');
                        i2.addEventListener('click',() => soustraction(item));
                        i2.setAttribute('class','fas fa-minus-circle soustraction');
                    td3.append(i2);

                    let td4 = document.createElement('td');
                        td4.setAttribute('class','col-1');
                        td4.innerHTML= item.price;

                    let td5 = document.createElement('td');
                        td5.setAttribute('class','col-1')
                        td5.setAttribute('class','somme')

                        td5.innerHTML= item.price * item.inCart ;

                    tr.append(td1)
                    tr.append(td2)
                    tr.append(td3)
                    tr.append(td4)
                    tr.append(td5)
                    productContainer.append(tr);

                    // on ajoute la somme total dans le localStorage

                    productTotal.innerHTML = cartCost;

                })
            }

            
}   

displayCart();
updatePanier ();

function updatePanier () {
    let totalCost = parseInt(localStorage.getItem('totalCost'));
    let cartNumber = parseInt(localStorage.getItem('cartNumber'));
    let totalProduit= document.querySelector('.totalProduit'); 
    totalProduit.innerHTML = totalCost;// afficher le total des produits quand la page se rafraichir;  
    document.getElementById('in-cart-items-num').innerHTML = cartNumber;
}

function addition (item) { // ajouter 1 quand on click sur + et mise à jour localStorage
        
    let cart = localStorage.getItem('productInCart');// saisir localStorage
    cart= JSON.parse(cart);
    cart[item.name]['inCart'] +=1;// ajouter +1 quand on click;
    localStorage.setItem('productInCart', JSON.stringify(cart)); // enregistrer nouvelle valeur

    let tab = Object.values(cart) // saisir à nouveau localStorage et convertir en tableau

    let quantity = document.querySelectorAll('.quantity'); //accéder aux HTML pour afficher
    let somme = document.querySelectorAll('.somme');
    let panier = document.getElementById('in-cart-items-num');
    let sousTotal = document.getElementById('tfoot');
    let totalProduit= document.querySelector('.totalProduit');
    // let prixApayer = document.querySelector('.prixApayer');
    
    let panierTotal = 0;
    let sum = 0;

    for ( let i=0; i<tab.length; i++) {
        tab[i].total = tab[i].inCart * tab[i].price;//ajouter la somme total dans chaque produit
        panierTotal +=tab[i].inCart; // faire addition de tous les sommes total de chaque produit


        panier.innerHTML = panierTotal;
        localStorage.setItem('cartNumber', JSON.stringify(panierTotal)) // enregistrer la valeur

        sum += tab[i].total;
        localStorage.setItem('totalCost', JSON.stringify(sum));// enregistrer la valeur
        localStorage.setItem('TOTAL', JSON.stringify(sum));

        quantity[i].innerHTML = tab[i].inCart; // afficher le résultat dans HTML
        somme[i].innerHTML = tab[i].total;
        sousTotal.innerHTML = sum;
        totalProduit.innerHTML = JSON.parse(localStorage.getItem('totalCost'));
        // prixApayer.innerHTML= JSON.parse(localStorage.getItem('TOTAL'));
    } 
}

// répéter la même opération que fonction addition
function soustraction (item) {//enlever 1 quand on click sur - et mise à jour localStorage
    let cart = localStorage.getItem('productInCart');
    cart= JSON.parse(cart);
    cart[item.name]['inCart'] -=1;
    localStorage.setItem('productInCart', JSON.stringify(cart));

    let tab = Object.values(cart)

    let quantity = document.querySelectorAll('.quantity');
    let somme = document.querySelectorAll('.somme');
    let panier = document.getElementById('in-cart-items-num');
    let sousTotal = document.getElementById('tfoot');
    let totalProduit= document.querySelector('.totalProduit');

    let panierTotal = 0;
    let sum = 0;

    for ( let i=0; i<tab.length; i++) {
        tab[i].total = tab[i].inCart * tab[i].price;
        panierTotal +=tab[i].inCart;

        localStorage.setItem('cartNumber', JSON.stringify(panierTotal))

        sum += tab[i].total;
        localStorage.setItem('totalCost', JSON.stringify(sum));
        localStorage.setItem('TOTAL', JSON.stringify(sum));


        quantity[i].innerHTML = tab[i].inCart;
        somme[i].innerHTML = tab[i].total;
        panier.innerHTML = panierTotal;
        sousTotal.innerHTML = sum;
        totalProduit.innerHTML = JSON.parse(localStorage.getItem('totalCost'));
    }
}


//Changer le prix de livraison selon le nombre d'articles dans le panier et le mode livraison
let prixChrono = document.querySelector('.prixChrono');
let prixColis = document.querySelector('.prixColis');
let totalLivraison = document.querySelector('.totalLivraison');

let choixRatio = document.querySelector('.choixRatio');
let inputChrono = document.getElementById("btnRatio1");
let inputColis = document.getElementById("btnRatio2");

inputChrono.addEventListener('change', ()=> { // quand le Chronopost est choisi, on affiche le prix selon la quantity et Charger le prix de livraison dans la zone TOTAL
    
    let allArticle = JSON.parse(localStorage.getItem('cartNumber'));
     
    if( inputChrono.checked==false) {prixChrono.innerHTML = ""; }
    else if( inputChrono.checked && allArticle<=3) {
        prixChrono.innerHTML = 29 ;
        prixColis.innerHTML="";
        totalLivraison.innerHTML = 29;
        localStorage.setItem('livraison', 29);
    } 
    else if( inputChrono.checked && allArticle>3 && allArticle<=6) {
            prixChrono.innerHTML = 33 ;
            prixColis.innerHTML="";
            totalLivraison.innerHTML = 33;
            localStorage.setItem('livraison', 33);
    }

    else {  prixChrono.innerHTML = 39;
            prixColis.innerHTML="";
            totalLivraison.innerHTML = 39;
            localStorage.setItem('livraison', 39);
    }
    prixTOTAL();
})
 
inputColis.addEventListener('change', ()=> { // quand le Chronopost est choisi, on affiche le prix selon la quantity
    let allArticle = JSON.parse(localStorage.getItem('cartNumber'));

    if( inputColis.checked==false) {prixColis.innerHTML = ""; }
    else if( inputColis.checked && allArticle<=3) {
            prixColis.innerHTML = 7 ;
            prixChrono.innerHTML ="";
            totalLivraison.innerHTML = 7;
            localStorage.setItem('livraison', 7);

    } 
    else if( inputColis.checked && allArticle>3 && allArticle<=6) {
            prixColis.innerHTML = 9 ;
            prixChrono.innerHTML ="";
            totalLivraison.innerHTML = 9;
            localStorage.setItem('livraison', 9);

    }
    else {  prixColis.innerHTML = 15;
            prixChrono.innerHTML ="";
            totalLivraison.innerHTML = 15;
            localStorage.setItem('livraison', 15);
    }
    prixTOTAL();
})

function prixTOTAL() {//calculer le prix à payer: produit + livraison
    let livraison = JSON.parse(localStorage.getItem('livraison'));
    let totalCost = JSON.parse(localStorage.getItem('totalCost'));
    let TOTAL = livraison + totalCost;
    localStorage.setItem('TOTAL', JSON.stringify(TOTAL));
    let prixApayer = document.querySelector('.prixApayer');
    prixApayer.innerHTML = JSON.parse(localStorage.getItem('TOTAL'));
}

let prixApayer = document.querySelector('.prixApayer');
prixApayer.addEventListener('load', function hide() { // afficher le montant TOTAL seulement quand le mode de livraison est choisi

    if( inputColis.checked == false && inputChrono.checked == false ) {
        totalLivraison.innerHTML = "";
    }
})

// Valider la commande et passer à la formulaire de contact

let valideCommande = document.querySelector('.valideCommande');
valideCommande.addEventListener('click', (event) => {
    
    if(inputColis.checked == false && inputChrono.checked == false) {//si on n'a pas choisir le mode de livraison
        alert('Veuillez choisir un mode de livraison')
    }
    else if(inputColis.checked || inputChrono.checked ) { // s'il y a le mode de livraison, on vérifie ensuite pour option de paiement
        let creditCard = document.querySelectorAll('.creditCard');
        let optionCC = document.querySelector('.optionCC');
        for (let i=0; i<creditCard.length; i++) {
            if(creditCard[i].checked) { return true;
               }
            else{alert("Veuillez choisir un mode de paiement");}
        }
    }
    else {event.href='formulaire_contact.html' }// si tout est ok; aller sur la page de formulaire_contact
})





    
    
