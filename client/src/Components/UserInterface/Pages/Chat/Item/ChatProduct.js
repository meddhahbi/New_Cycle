import React from 'react';

function ChatProduct(props) {
    let {prod} = props;
    // console.log(prod);
    return (
        <div className="card" style={{ display: 'inline-block', width: '400px', margin: '10px' }}>

            {prod && prod.images && (
                <img
                    className="card-img-top"
                    src={`http://localhost:3001/${prod.images}`}
                    alt={prod && prod.name}
                    width="300"
                    height="300"
                />
            )}
            <div className="card-body">
                <h5 className="card-title">{prod && prod.name}</h5>
                <p className="card-text">{prod && prod.description}</p>
                <h6 className="card-subtitle mb-2 text-muted">
                    {prod && prod.price}DT
                </h6>
                <p className="card-text">{prod && prod.category}</p>
            </div>
        </div>
    );
}

export default ChatProduct;