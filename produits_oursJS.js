let promise = fetch('http://localhost:3000/api/teddies')
    .then (response => response.json())
        .then (data => chargement (data))
    .catch ( error => alert('erreur' + error));

    function chargement (data) {
        let ours = data;
        
        for(let i=0;i<ours.length; i++) {
            
            let containeur = document.querySelector('.containeur');
            let teddy = document.createElement ('div');
                teddy.setAttribute('class','col-sm-10 col-md-5 flex-column m-auto mb-3 text-center');
                containeur.appendChild(teddy);
            let link = document.createElement ('a');
                link.setAttribute('class','card produit bg-light ours');
                teddy.appendChild(link);
                link.href='teddyEnJs.html' + '?id=' + ours[i]._id;
            let photoTeddy = document.createElement ('img');
                photoTeddy.setAttribute('class','card-img-top h-75');
                photoTeddy.setAttribute('alt', ours[i].name)
                link.appendChild(photoTeddy);
                photoTeddy.src=ours[i].imageUrl;
            let ajoutPanier = document.createElement('h5');
                ajoutPanier.setAttribute('class','card-text hide p-1');
                ajoutPanier.innerHTML = 'Ajouter au panier';
                link.appendChild(ajoutPanier);
            let titre = document.createElement('h4');
                titre.setAttribute('class','card-title');
                titre.innerHTML = ours[i].name;
                link.appendChild(titre);
            let para = document.createElement('p');
                para.setAttribute('class','card-text ls-2 fw-bold');
                para.innerHTML = "Prix : " + ours[i].price;
                link.appendChild(para);
        }
        
    }   