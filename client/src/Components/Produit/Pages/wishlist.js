import { useEffect, useState } from 'react';
import axios from 'axios';

function useWishlist() {

  const token = localStorage.getItem("token");
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const userId = payload.id;
  
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {

      try {
        console.log(userId)
        const response = await axios.get(`http://localhost:3001/wishlist/${userId}`);
        console.log(response.data); 
        //console.log('test')
        setWishlist(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist()
   
  }, []);

  return (
    <div>
      <h2>My Wishlist</h2>
        <ul>
          {wishlist?
        <>
        {wishlist.map((wishlists) => (
            <li key={wishlists._id}>
              <h3>{wishlists.name}</h3>
              <p>{wishlists.description}</p>
              <p>Price: {wishlists.price}</p>
            </li>
          ))}
          
        </> 
        :"" 
        }
          
        </ul>
     
    </div>
  );
}

export default useWishlist;
