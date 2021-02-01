
let promise = fetch('http://localhost:3000/api/teddies')
    .then (response => response.json())
        .then (data => chargerArticle (data))
    .catch ( error => alert('erreur' + error));

    


    function chargerArticle (data) {
        let ours = data;
        let id = window.location.href.split("=");
        let ref = id[1];
        for( let i=0; i<ours.length;i++) {
            //si la référence dans url est le meme que _id du produit ours, on charge les data de cet ours
            if (ref === ours[i]._id) {
                let article = document.querySelector('.article');
                //On ajoute les éléments HTML de façon dynamique
                let col_photo_ours = document.createElement('div');
                    col_photo_ours.setAttribute('class','col-sm-6 text-center');
                    article.appendChild(col_photo_ours);

                let photo = document.createElement('img');
                    photo.setAttribute('class','photo_ours w-75 m-auto img-fluid img-thumbnail');
                    photo.setAttribute('alt', ours[i].name)
                    photo.src = ours[i].imageUrl;
                    col_photo_ours.appendChild(photo);

                let div = document.createElement('div');
                    div.setAttribute('class', 'col-9 col-sm-5 m-auto');
                    article.appendChild(div);

                let titleNom = document.createElement('h1');
                    titleNom.innerHTML = "Ours " + ours[i].name;
                    div.appendChild(titleNom);

                let price = document.createElement('p');
                    price.setAttribute('class', 'fw-bold fs-2');
                    price.innerHTML = 'Prix : '+ ours[i].price;
                    div.appendChild(price);
                // on ajoute label et select avec option couleur
                let select = document.createElement('label');
                    select.setAttribute('class', 'pl-3');
                    select.setAttribute('for', 'color');
                    select.innerHTML = 'Choisir votre couleur';
                    div.appendChild(select);

                let choixColor = document.createElement('select');
                    choixColor.setAttribute('class', 'form-select w-50 mt-2 mb-2');
                    choixColor.setAttribute('id', 'color');
                    choixColor.setAttribute('type', 'checkbox');
                    choixColor.setAttribute('aria-label', 'Default select exemple');
                    div.appendChild(choixColor);

                let j = 0;
                    for ( j= 0 ; j<ours[i].colors.length; j++) {
                        let colorOption = document.createElement('option');
                        colorOption.setAttribute('value', ours[i].colors.length[j]);
                        colorOption.innerHTML = ours[i].colors[j];
                        choixColor.append(colorOption);
                    };

                let description = document.createElement('h5');
                    description.setAttribute('class', 'mt-1 mb-1');
                    description.innerHTML = 'Description';
                    div.appendChild(description);

                let ligne = document.createElement('hr');
                    ligne.setAttribute('class', 'text-danger w-25');
                    div.appendChild(ligne);

                let textDescrip = document.createElement('p');
                    textDescrip.setAttribute('class', 'w-md-50 text-justify');
                    textDescrip.innerHTML = ours[i].description;
                    div.appendChild(textDescrip);
                // ajoute un button et et data-* pour récupérer info pour panier
                let button = document.createElement('button');
                    button.setAttribute('class', 'btn btn-primary mt-3 mb-3 add-cart');
                    button.setAttribute('type','submit');
                    button.setAttribute('data-id', ours[i]._id);
                    button.setAttribute('data-name', ours[i].name);
                    button.setAttribute('data-price', ours[i].price);
                    button.setAttribute('data-url', 'teddyEnJs.html' + '?id=' + ours[i]._id);
                    button.setAttribute('data-phto', ours[i].imageUrl);
                    button.innerHTML = 'Ajouter au panier';
                    div.appendChild(button);
                // quand on click sur button, un message s'affiche et 1 article ajouté au panier
                // let nombreArticle = document.getElementById('in-cart-items-num');
                // let s = 0;
                // button.addEventListener('click', function addCart(e) {
                //     e.preventDefault();
                //     alert('1 article a bien ajouté');
                //     s++;
                //     nombreArticle.innerHTML = '(' + s +')';
                // });

            }
            // si la référence n'est pas identique que _id; on les affiche en tant que d'autre droduits
            else {
                let autreArticle = document.querySelector('.autreArticle');
                let autreProduit = document.createElement('a');
                    autreProduit.setAttribute('class', 'card col-5 col-md-3 text-center m-auto mb-2 p-0 choix_en_plus produit pb-2');
                    autreProduit.href = "teddyEnJs.html" + '?id=' + ours[i]._id;
                let autrePhoto = document.createElement('img');
                    autrePhoto.setAttribute('class', 'card-img-top h-75');
                    autrePhoto.setAttribute('src', ours[i].imageUrl);
                    autrePhoto.setAttribute('alt', ours[i].name);
                    autreProduit.appendChild(autrePhoto);
                let autreTitle = document.createElement('h3');
                    autreTitle.setAttribute('class', 'card-title');
                    autreTitle.innerHTML = ours[i].name;
                    autreProduit.appendChild(autreTitle);
                // let paragraphe = document.createElement('p');
                //     paragraphe.setAttribute('class', 'card-text hide p-1');
                //     paragraphe.innerHTML = "Ajouter au panier";
                //     autreProduit.appendChild(paragraphe);

                autreArticle.append(autreProduit);

            }
        } 

        /* utiliser localStorage pour stocker les info dans le panier */

        let cart = document.querySelector('.add-cart');
        
        cart.addEventListener('click', () =>{
                 cartNumber();
                
                
            })
        

         function cartNumber () {
            localStorage.setItem('cartNumber',1);
            let productNumber = localStorage.getItem('cartNumber');
            productNumber.parseInt(productNumber);
            if(productNumber) { localStorage.setItem('cartNumber', productNumber + 1)}
            else {localStorage.setItem('cartNumber',1);}
            document.getElementById('in-cart-items-num').innerHTML = productNumber + 1;
        }
        
    }
