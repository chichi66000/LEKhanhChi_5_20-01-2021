

 // afficher le nombre d'article dans le panier s'il y en a
 let inCart = document.getElementById('in-cart-items-num');
 let cart = document.querySelector('.fa-shopping-cart');
 cart.addEventListener('click', (e) => {
    if( ! localStorage.getItem('cartNumber')) {
        inCart.innerHTML = "vide";
        e.preventDefault();
 }
})
 
if (localStorage.getItem('cartNumber')) {
    inCart.innerHTML =localStorage.getItem('cartNumber');
}
else {inCart.innerHTML = "";}







