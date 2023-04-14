// //import { BoltLoader } from "react-awesome-loaders";
// import './style/loader.css';
// import React, { useEffect, useState } from 'react';




// export const LoadAssociation = () => {

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       window.location.href = '/loginAssociation'; 
//     }, 9000); 
//     return () => clearTimeout(timeout);
//   }, []);


//   const [showFirstMessage, setShowFirstMessage] = useState(true);

//   useEffect(() => {
//     const firstTimer = setTimeout(() => {
//       setShowFirstMessage(false);
//     }, 5000);

//     const secondTimer = setTimeout(() => {
//       setShowFirstMessage(true);
//     }, 10000);

//     return () => {
//       clearTimeout(firstTimer);
//       clearTimeout(secondTimer);
//     };
//   }, []);

//   return (
//     <div className="loader">
//    <center>     <BoltLoader
//         className={"loaderbolt"}
//         boltColor={"#3CB371"}
//         backgroundBlurColor={"#3CB371"}
//       /><br/><br/><br/><br/>
//       {/* <h2>Please wait Verification for the document</h2> */}
//       {showFirstMessage ? (
//           <h2>Please wait Verification for the document</h2>
//         ) : (
//           <h2>You can Log In now</h2>
//         )}
//       </center>
//     </div>
//   );
// };