
import React from 'react';
import axios from "axios";

function Prod(props) {
    const {product, cat, products, setProducts} = props;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
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
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <h6 className="card-subtitle mb-2 text-muted">
                    {product.price}DT
                </h6>
                {/*<p className="card-text">{cat.name}</p>*/}
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