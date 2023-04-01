import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllProducts() {
const [products, setProducts] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
axios
.get('http://localhost:3001/produit/all')
.then(response => {
setProducts(response.data.products);
})
.catch(error => {
console.log(error);
});
}, []);

function deleteProduct(id) {
axios.delete(`http://localhost:3001/produit/${id}`)
.then(response => {
setProducts(products.filter(product => product._id !== id));
})
.catch(error => {
console.log(error);
});
}

function updateProduct(id) {
window.location.href = `/UpdateProduct/${id}`;
}
function CreateProduct(id) {
      window.location.href = "/produit";
      }

const searchResults = searchTerm ? products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())) : products;

return (
<div>
<h1>Liste de produits</h1>
<input type="text" placeholder="Rechercher un produit" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
<ul>
{searchResults.map(product => (
<li key={product._id}>
<h2>{product.name}</h2>
<p>{product.description}</p>
<h3>{product.price}DT</h3>
<p>{product.category}</p>
<div>
{product.images.map(images => (
     <img src={`../${images.url}`} alt={images.caption} key={images._id} style={{maxWidth: "300px", maxHeight: "300px"}} />

      ))}
</div>
<button onClick={() => deleteProduct(product._id)}>Supprimer</button>
<button onClick={() => updateProduct(product._id)}>modifier</button>
<button onClick={() => CreateProduct(product)}>new</button>
</li>

))}
</ul>

</div>
);
}

export default AllProducts;