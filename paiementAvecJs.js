
        // charger la page paiement.html avec les éléments du localStorage;
        function displayCart() {
            let cartItems = localStorage.getItem('productInCart'); // on récupère les produits dans localstorage
            cartItems = JSON.parse(cartItems);
            let productContainer = document.getElementById('chargementPanier');
            let cartCost = localStorage.getItem('totalCost'); // la somme total des articles
            cartCost = parseInt(cartCost);

            if( cartItems && productContainer ) { // s'il y a le contenu dans le storage et aussi on est sur la page paiement
                productContainer.innerHTML = '';
                Object.values(cartItems).map (item => { // on ajoute dans le HTML ce contenu
                    productContainer.innerHTML += ` 
                    <tr>
                        <td class="col-md-2 produit_paiement"><img class="img-fluid img-thumbnail " src="${item.photo}" alt="${item.name}"/></td>
                        <td class="col-2">${item.name}</td>
                        <td class="col-1">
                            <i class="fas fa-plus-circle addition"></i> <span class="quantity"> ${item.inCart} </span><i class="fas fa-minus-circle soustraction"></i>
                            
                        </td>
                        <td class="col-1"><p class="fw-bold">${item.price}</p></td>
                        <td class="col-1"><p class="fw-bold">${item.price * item.inCart}</p></td>
                    </tr>
                    `
                });

                //on ajoute la somme total dans le localStorage
                productContainer.innerHTML += `
                    <table class="table m-auto table-responsive-sm">
                        <thead>
                            <tr>   
                                <th class="col-md-2 produit_paiement"></th>
                                <th class="col-1"></th>
                                <th class="col-1"></th> 
                                <th class="col-2">Sous total</th>
                                <th class="col-1">${cartCost}</th>
                            </tr>
                        </thead>
                    </table>
                `
            }

            // on modifie la quantité des articles et modifier la somme total
            let addition = document.querySelector('.addition');
            let soustraction = document.querySelector('.soustraction');
            let quantity = document.querySelector('.quantity');
                    addition.addEventListener ('click', () => {
                        console.log(cartItems[product.name].inCart)
                    })
        }

        
        

    displayCart()

