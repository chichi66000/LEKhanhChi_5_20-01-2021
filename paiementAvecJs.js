
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


let cart = localStorage.getItem('productInCart');//saisir les produits dans localStorage
cart = JSON.parse(cart);
let tab = Object.values(cart); // convertir ses valeurs en tableau des objects

function addition (item) { // ajouter 1 quand on click sur + et mise à jour localStorage
        
    let cart = localStorage.getItem('productInCart');
    cart= JSON.parse(cart);
    cart[item.name]['inCart'] +=1;
    localStorage.setItem('productInCart', JSON.stringify(cart));

    
    updatetotalCost()
    updatecartNumber ()
   
}

function soustraction (item) {//enlever 1 quand on click sur - et mise à jour localStorage
    let cart = localStorage.getItem('productInCart');
    cart= JSON.parse(cart);
    cart[item.name]['inCart'] -=1;
    localStorage.setItem('productInCart', JSON.stringify(cart));

    
    updatetotalCost()
    updatecartNumber ()

}

function updatetotalCost() {// mise à jour la valeur total pour ensemble des produits
    let s=0; 
    for(let i=0; i<tab.length; i++) {
        tab[i].total= tab[i].price * tab[i].inCart;
        
        s += tab[i].total;
    }
    localStorage.setItem('totalCost', JSON.stringify(s));
    let sousTotal = document.getElementById('tfoot');
    let somme = localStorage.getItem('totalCost');
    somme= JSON.parse(somme);
    sousTotal.innerHTML = somme;
}

function updatecartNumber () {
    let x=0; 
    for(let i=0; i<tab.length; i++) {
        x += tab[i].inCart
    }
    localStorage.setItem('cartNumber', JSON.stringify(x));
    let sum = JSON.parse(localStorage.getItem('cartNumber'));
    
    let panier = document.getElementById('in-cart-items-num');
    panier.innerHTML= sum;
}

updatetotalCost()
updatecartNumber ()




    
    
