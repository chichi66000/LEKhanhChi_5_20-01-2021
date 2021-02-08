

function updatePanier () {
    // let totalCost = parseInt(localStorage.getItem('totalCost'));
    let cartNumber = parseInt(localStorage.getItem('cartNumber'));
    // let totalProduit= document.querySelector('.totalProduit'); 
    // totalProduit.innerHTML = totalCost;// afficher le total des produits quand la page se rafraichir;  
    document.getElementById('in-cart-items-num').innerHTML = cartNumber;
}
updatePanier ()
   
   let formumaire = document.getElementById('formulaire');
    formulaire.addEventListener ('submit', function valider (e) {
        e.preventDefault();

        let nom = document.getElementById('nom');
        let prenom = document.getElementById('prenom');
        let tel = document.getElementById ('tel');
        let email = document.getElementById ('email');
        let adresse = document.getElementById ('adresse');
        let ville = document.getElementById('ville');
        let pays = document.getElementById ('pays');
        let codePostal = document.getElementById('codePostal');

/*
        let validation = document.getElementById('btn-submit');
        validation.addEventListener ('click', f_valid);

        function f_valid (e) {*/
            let text_nom = /^[a-zA-ZéèîïÉÈÊËÍÌÎÏ][a-zéèîïàçâäêëôöùûüÿ]+([a-zA-ZéèîïÉÈÊËÍÌÎÏ][a-zéèîïàçâäêëôöùûüÿ]+)?$/;
            let text_validation = /^[a-zA-ZéèîïÉÈÊËÍÌÎÏ][a-zéèîïàçâäêëôöùûüÿ]+([-'\s][a-zA-ZéèîïÉÈÊËÍÌÎÏ][a-zéèîïàçâäêëôöùûüÿ]+)?$/;
            let tel_validation = /[0-9]{10}/;
            let adresse_validation = /^[0-9]+[\s]+[a-zA-ZéèîïÉÈÊËÍÌÎÏ][a-zéèîïàçâäêëôöùûüÿ]/;
            let ville_validation = /^[a-zA-ZéèîïÉÈÊËÍÌÎÏ][a-zaàiéèîïàçâäêëôöùûüÿ]/;
            let pays_validation = /France|Belgique|Allemagne|Espagne]/i;
            let codePostal_validation = /[0-9]{5}/;
            let email_validation = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;


            if(prenom.validity.valueMissing || nom.validity.valueMissing || tel.validity.valueMissing || email.validity.valueMissing || adresse.validity.valueMissing || ville.validity.valueMissing || pays.validity.valueMissing) {
                e.preventDefault();
                e.stopPropagation ();
            }
                
            else if (text_nom.test(nom.value) == false) { e.preventDefault (); e.stopPropagation ();alert("nom : format invalid");}

            else if ( text_validation.test (prenom.value) == false) { e.preventDefault ();e.stopPropagation (); alert(" prenom : format invalid")}

            else if (email_validation.test(email.value) == false) { e.preventDefault ();e.stopPropagation (); alert("email: format invalid");}

            else if ( tel_validation.test (tel.value) == false) { e.preventDefault ();e.stopPropagation (); alert("téléphone : format invalid");}

            else if (adresse_validation.test (adresse.value) == false) {e.preventDefault ();e.stopPropagation (); alert("adresse: format invalid");}

            else if ( ville_validation.test (ville.value) == false) { e.preventDefault (); e.stopPropagation ();alert("ville: format invalid");}

            else if (codePostal_validation.test(codePostal.value) == false) { e.preventDefault ();e.stopPropagation (); alert ("code postal : format invalid");}

            else if ( pays_validation.test (pays.value) == false) { e.preventDefault (); e.stopPropagation (); alert("pays: incorrect");}
        
            else { 
                // let headers = new Headers();
                // headers.set('Content-Type', 'application/json');

                const data = {
                    firstName: nom.value,
                    lastName: prenom.value,
                   address: adresse.value,
                    city: ville.value,
                   email: email.value,
                }
                // Récupérer que id et nombre article pour POST au serveur
                let produitData = JSON.parse(localStorage.getItem('productInCart'));
                produitData = Object.values(produitData);
                post=[];
                    for ( let i=0; i< produitData.length;i++) {
                        post.push(produitData[i].id)
                        
                    }

                let optionFetch = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({'contact':data,
                            'products':post})
                }
                let response = fetch('http://localhost:3000/api/teddies/order', optionFetch); 

                response.then( async (data) => {
                    try{ let info = await data.json();
                    localStorage.setItem('orderId', info.orderId);// récupérer orderID reçu du serveur et stocker
                    window.location.href = 'confirmationJs.html';// aller sur la page de confirmation quand tout ok

                    }catch(error){ alert('erreur' + error)}
                })
               
                
                
            }
        })


        

