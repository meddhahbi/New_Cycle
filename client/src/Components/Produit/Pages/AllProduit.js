import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 3;
  const pagesVisited = pageNumber * productsPerPage;

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

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  function deleteProduct(id) {
    axios
      .delete(`http://localhost:3001/produit/${id}`)
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
    window.location.href = '/produit';
  }

  (function(d, m){
    var kommunicateSettings = {"appId":"6a8808e38d7631e8bf8f5a70e9b9fd7f","popupWidget":true,"automaticChatOpenOnNavigation":true};
    var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
    window.kommunicate = m; m._globals = kommunicateSettings;
  })(document, window.kommunicate || {});
  

  const searchResults = searchTerm
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const displayProducts = searchResults
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map(product => (
      <li key={product._id}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>{product.price}DT</h3>
        <p>{product.category}</p>
        <div>
          {product.images.map(images => (
            <img
              src={`../${images.url}`}
              alt={images.caption}
              key={images._id}
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          ))}
        </div>
        <button onClick={() => deleteProduct(product._id)}>Supprimer</button>
        <button onClick={() => updateProduct(product._id)}>modifier</button>
        <button onClick={() => CreateProduct(product)}>new</button>
      </li>
    ));

  return (
    <div>
      <h1>Liste de produits</h1>
      <input
        type="text"
        placeholder="Rechercher un produit"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>{displayProducts}</ul>
      <ReactPaginate
        previousLabel={'Précédent'}
        nextLabel={'Suivant'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </div>
  );
}

export default AllProducts;
