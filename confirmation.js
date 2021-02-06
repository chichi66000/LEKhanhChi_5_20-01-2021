

let TOTAL = localStorage.getItem('TOTAL');
TOTAL = parseInt(TOTAL);

let recapitulatif = document.getElementById('recapitulatif');

let tr1 = document.createElement('tr');

let td1 = document.createElement('td');
    td1.innerHTML = "N° commande";
    tr1.append(td1);

let nCommande = document.createElement('td');
    nCommande.setAttribute('class', 'text-right');
    // nCommande.innerHTML;
    tr1.append(nCommande);

let tr2 = document.createElement('tr');

let td2 = document.createElement('td');
    td2.innerHTML = "Montant";
    tr2.append(td2);

let montant = document.createElement('td'); // recuperer le montant total du commande
    montant.innerHTML = TOTAL;
    tr2.append(montant);

// let tr3 = document.createElement('tr'); essayer de récuperer le mode de paiement
recapitulatif.append(tr1)
recapitulatif.append(tr2)

// Récupérer info du produit, prix, date livraison...
let productInCart = JSON.parse(localStorage.getItem('productInCart'));
// productInCart = JSON.parse(productInCart);
// productInCart = Object.values(productInCart);

let info_product = document.getElementById('info_product');

if (productInCart && info_product ) {
    Object.values(productInCart).map(item => {
        let tr4 = document.createElement('tr');
            let photo = document.createElement('td');
                photo.setAttribute('class', 'produit_paiement col-md-2');
                    let img = document.createElement('img');
                        img.setAttribute('class', 'img-fluid img-thumbnail');
                        img.src= item.photo;
                        img.setAttribute('alt', item.name);
                
                photo.append(img);

            let quantity = document.createElement('td');
                quantity.innerHTML= item.inCart;
            
            
            let prix = document.createElement('td');
                prix.innerHTML= item.price;

            let total = document.createElement('td');
                total.setAttribute('class','text-right');
                total.innerHTML= item.price * item.inCart;
             
            tr4.append(photo);
            tr4.append(quantity);
            tr4.append(prix);
            tr4.append(total);

            info_product.append(tr4);



    })
}

let info_TOTAL = document.getElementById("info_TOTAL");
let tr5 = document.createElement('tr');
    tr5.setAttribute('class', 'fw-bold');

    let soustotal = document.createElement('td');
        soustotal.setAttribute('class', 'fw-bold');
        soustotal.innerHTML = "TOTAL";
        tr5.append(soustotal);

    let soustotal1 = document.createElement('td');
        soustotal1.setAttribute('colspan', '3');
        soustotal1.setAttribute('class', 'text-right');
        soustotal1.innerHTML = TOTAL;
        tr5.append(soustotal1);
info_TOTAL.append(tr5)







