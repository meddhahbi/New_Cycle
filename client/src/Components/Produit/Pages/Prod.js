import React from 'react';
import axios from "axios";

function Prod(props) {
    
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const {product, products, setProducts} = props;
    function deleteProduct(id) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            axios
                .delete(`http://localhost:3001/produit/${id}`)
                .then(response => {
                    setProducts(products.filter(product => product._id !== id));
                    window.location.href = "AllProduit";
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const addToWishlistHandler = async (productId) => {


        const response = await axios.get(`http://localhost:3001/produit/${productId}`);
        const { product, userId } = response.data;
        console.log('Product details:', product);
        console.log('Product stock:', product.stock);
        // Check if the product is in stock
        if (product.stock > 0) {
          // Decrement the stock value of the product
          product.stock -= 1;
          console.log('Product stock decremented:', product.stock);
    
          // Update the product in the database
          const response2 = await axios.put(`http://localhost:3001/produit/up/${productId}`, product);
          console.log('Product updated in the database:', response2.data);
    
          try {
            const mail = localStorage.getItem('mail');
            if (!mail) {
              console.log('Email address not found in local storage');
              return;
            }
            
            const response = await axios.get(`http://localhost:3001/me/${mail}`);
            const userId = response.data.userId;
            const response2 = await axios.post('http://localhost:3001/wishlist', { productId, userId });
            console.log(response2);
          //  window.location.href = `http://localhost:3000/wishlist/${userId}`;
           // console.log(response2.data.message);
            // TODO: show a success message to the user
          } catch (error) {
            console.log(error);
            // TODO: show an error message to the user
          }
        };
    }
    const addToComparisonHandler = async (productId) => {
        try {
            const response = await axios.post('http://localhost:3001/comparison', { products: [productId] }, config);
            console.log('Product added to comparison:', response.data);
    
            // Set comparison ID cookie
            document.cookie = `comparisonId=${response.data._id}; httpOnly`;
    
            // TODO: show a success message to the user
        } catch (error) {
            console.log(error);
            // TODO: show an error message to the user
        }
    };
      
      
      

    function updateProduct(id) {
        window.location.href = `/UpdateProduct/${id}`;
    }
    const sendMessage = async (e)=>{
        console.log(product.productOwner._id)
        const newChat = {
            userId:product.productOwner._id,
            productId:product._id,
            productName: product.name
        }
        await axios.post("http://localhost:3001/chat",newChat, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(data=>{
            console.log(data.data)
            localStorage.setItem("chats", data.data._id)
            window.location = "/client_messages"
        })
    }
    return (
        <div key={product._id} className="card" style={{ display: 'inline-block', width: '300px', margin: '10px' }}>
            <div className="card-body">
                <img className="card-img-top"
                     style={{width:"50px", height: "50px", borderRadius:"50%"}}
                     src={`http://localhost:3001/${product.productOwner.image}`}
                     alt={product.name}
                     // width="300"
                     // height="300""
                     />
                <span style={{marginLeft:"20px"}}>{product.productOwner.username}</span>
            </div>
            {product.images && (
                <img
                    className="card-img-top"
                    src={`http://localhost:3001/${product.images}`}
                    alt={product.name}
                    width="300"
                    height="300"
                />
            )}
             <button
  className="btn btn-link position-absolute top-0 end-0"
  onClick={() => addToWishlistHandler(product._id)}
>
  <i className="bi bi-heart h1"></i>
</button>

<button className="btn btn-link position-absolute top-0 start-0" onClick={() => addToComparisonHandler(product._id)}>
  <i className="bi bi-arrow-repeat h1"></i>
</button>

            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <h6 className="card-subtitle mb-2 text-muted">
                    {product.price}DT
                </h6>
                <p className="card-text">{product.category}</p>

                    <button
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target={`#product-${product._id}`}
                    >
                        Voir détails
                    </button>
                {product.productOwner._id !== userInfo._id?

                    <i className="fa fa-comment-dots" style={{marginLeft: "20px", color:"#00835a", fontSize:"xx-large", cursor:"pointer"}} onClick={sendMessage}/>
                    :
                    ""
                    }
            </div>

            <div
                className="modal fade"
                id={`product-${product._id}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby={`product-${product._id}-label`}
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`product-${product._id}-label`}>
                                {product.name}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img
                                className="img-fluid mb-3"
                                src={`http://localhost:3001/${product.images}`}
                                alt={product.name}
                                width="500"
                                height="500"
                            />
                            <p>{product.description}</p>
                            <p>Prix: {product.price}DT</p>
                            <p>Catégorie: {product.category}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss="modal"
                            >
                                Fermer
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => updateProduct(product._id)}
                            >
                                Modifier
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deleteProduct(product._id)}

                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Prod;
