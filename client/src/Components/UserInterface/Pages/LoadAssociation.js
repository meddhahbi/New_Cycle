import { BoltLoader } from "react-awesome-loaders";
import './style/loader.css'


// const timeout = setTimeout(() => {
//   window.location.href = '/login'; // replace with your desired URL
// }, 3000);
export const LoadAssociation = () => {
  return (
    <div className="loader">
   <center>     <BoltLoader
        className={"loaderbolt"}
        boltColor={"#3CB371"}
        backgroundBlurColor={"#3CB371"}
      /><br/><br/><br/><br/>
      <h2>Loading</h2>
      </center>
    </div>
  );
};