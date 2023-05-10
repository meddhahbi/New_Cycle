import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {useLocation} from "react-router";
import Prod from "./Prod";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 3;
  const pagesVisited = pageNumber * productsPerPage;
  const location = useLocation().pathname

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
    console.log(pageCount)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // function deleteProduct(id) {
  //   if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
  //     axios
  //         .delete(`http://localhost:3001/produit/${id}`)
  //         .then(response => {
  //           setProducts(products.filter(product => product._id !== id));
  //           window.location.href = "AllProduit";
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //   }
  // }
  //
  //
  // function updateProduct(id) {
  //   window.location.href = `/UpdateProduct/${id}`;
  // }
  function CreateProduct(id) {
    window.location.href = '/produit';
  }
  // if(location==="/AllProduit"){
  //   // console.log("produit")
  //   (function (d, m) {
  //     var kommunicateSettings = { "appId": "6a8808e38d7631e8bf8f5a70e9b9fd7f", "popupWidget": true, "automaticChatOpenOnNavigation": true };
  //     var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
  //     s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
  //     var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
  //     window.kommunicate = m; m._globals = kommunicateSettings;
  //   })(document, window.kommunicate || {})
  // }





  const searchResults = searchTerm
      ? products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : products;

  const displayProducts = searchResults
      .slice(pagesVisited, pagesVisited + productsPerPage)
      .map((product) => (

          <Prod
          product={product}
          cat={product.cat}
          products={products}
          setProducts={setProducts}
          />

      ));


  return (
      <div>






        <section class="search-section">
          <div class="container-fluid-lg">
            <div class="row">
              <div class="col-xxl-6 col-xl-8 mx-auto">
                <div class="title d-block text-center">
                  <h2>Search for products</h2>
                  <span class="title-leaf">
                  {/*<svg class="icon-width">*/}
                  {/*  <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>*/}
                  {/*</svg>*/}

                </span>
                </div>

                <div class="search-box">
                  <div class="input-group">
                    <input
                        type="text"
                        placeholder="Search for products"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        class="form-control"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-success" type="button">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <div className="card-container con" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{displayProducts}</div>
        <button className="btn btn-success" onClick={() => CreateProduct()}>new</button>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ReactPaginate
              previousLabel={<i className="fas fa-chevron-left"></i>}
              nextLabel={<i className="fas fa-chevron-right"></i>}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'paginationBttns'}
              previousLinkClassName={'previousBttn'}
              nextLinkClassName={'nextBttn'}
              disabledClassName={'paginationDisabled'}
              activeClassName={'paginationActive'}
              style={{fontSize: '24px'}}
          />
        </div>


        <div class="theme-option">
          <div class="back-to-top">
            <a id="back-to-top" href="#">
              <i class="fas fa-chevron-up"></i>
            </a>
          </div>
        </div>

      </div>
  );
}

export default AllProducts;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactPaginate from 'react-paginate';
// import {useLocation} from "react-router";
// import Prod from "./Prod";
//
// function AllProducts() {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pageNumber, setPageNumber] = useState(0);
//   const productsPerPage = 3;
//   const pagesVisited = pageNumber * productsPerPage;
//   const location = useLocation().pathname
//
//   useEffect(() => {
//     axios
//         .get('http://localhost:3001/produit/all')
//         .then(response => {
//           setProducts(response.data.products);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   }, []);
//
//   const pageCount = Math.ceil(products.length / productsPerPage);
//     console.log(pageCount)
//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//   };
//
//   // function deleteProduct(id) {
//   //   if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
//   //     axios
//   //         .delete(`http://localhost:3001/produit/${id}`)
//   //         .then(response => {
//   //           setProducts(products.filter(product => product._id !== id));
//   //           window.location.href = "AllProduit";
//   //         })
//   //         .catch(error => {
//   //           console.log(error);
//   //         });
//   //   }
//   // }
//   //
//   //
//   // function updateProduct(id) {
//   //   window.location.href = `/UpdateProduct/${id}`;
//   // }
//   function CreateProduct(id) {
//     window.location.href = '/produit';
//   }
//   // if(location==="/AllProduit"){
//   //   // console.log("produit")
//   //   (function (d, m) {
//   //     var kommunicateSettings = { "appId": "6a8808e38d7631e8bf8f5a70e9b9fd7f", "popupWidget": true, "automaticChatOpenOnNavigation": true };
//   //     var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
//   //     s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
//   //     var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
//   //     window.kommunicate = m; m._globals = kommunicateSettings;
//   //   })(document, window.kommunicate || {})
//   // }
//
//
//
//
//
//   const searchResults = searchTerm
//       ? products.filter(product =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       : products;
//
//   const displayProducts = searchResults
//       .slice(pagesVisited, pagesVisited + productsPerPage)
//       .map((product) => (
//
//           <Prod
//           product={product}
//           cat={product.cat}
//           products={products}
//           setProducts={setProducts}
//           />
//
//       ));
//
//
//   return (
//       <div>
//
//
//
//
//
//
//         <section class="search-section">
//           <div class="container-fluid-lg">
//             <div class="row">
//               <div class="col-xxl-6 col-xl-8 mx-auto">
//                 <div class="title d-block text-center">
//                   <h2>Search for products</h2>
//                   <span class="title-leaf">
//                   {/*<svg class="icon-width">*/}
//                   {/*  <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>*/}
//                   {/*</svg>*/}
//
//                 </span>
//                 </div>
//
//                 <div class="search-box">
//                   <div class="input-group">
//                     <input
//                         type="text"
//                         placeholder="Search for products"
//                         value={searchTerm}
//                         onChange={e => setSearchTerm(e.target.value)}
//                         class="form-control"
//                     />
//                     <div class="input-group-append">
//                       <button class="btn btn-success" type="button">
//                         <i class="fa fa-search"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//
//               </div>
//             </div>
//           </div>
//         </section>
//
//         <div className="card-container con" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{displayProducts}</div>
//         <button className="btn btn-success" onClick={() => CreateProduct()}>new</button>
//         <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//           <ReactPaginate
//               previousLabel={<i className="fas fa-chevron-left"></i>}
//               nextLabel={<i className="fas fa-chevron-right"></i>}
//               pageCount={pageCount}
//               onPageChange={changePage}
//               containerClassName={'paginationBttns'}
//               previousLinkClassName={'previousBttn'}
//               nextLinkClassName={'nextBttn'}
//               disabledClassName={'paginationDisabled'}
//               activeClassName={'paginationActive'}
//               style={{fontSize: '24px'}}
//           />
//         </div>
//
//
//         <div class="theme-option">
//           <div class="back-to-top">
//             <a id="back-to-top" href="#">
//               <i class="fas fa-chevron-up"></i>
//             </a>
//           </div>
//         </div>
//
//       </div>
//   );
// }
//
// export default AllProducts;
