import React from "react";
import imageData from "../teamLogo"
import { useContext } from "react";
import { ImageContext } from "../ImageContext";


export default function Logo (props) {
    const {currentImage, setCurrentImage} = useContext(ImageContext);
   
  
    const [allLogos, setAllLogos]= React.useState(imageData.data)
    
    function getLogo (){
        
        const url = allLogos[props.currentTeamId-1].url
        const id = allLogos[props.currentTeamId-1].id
       
       setCurrentImage(prevImg => ({
            ...prevImg,
            imageId: id,
            imageUrl: url,
            
           
            
        }))
       
        
    }
    
   
    return(

      <div>
        <button onClick={getLogo} className="logo-btn">hjdjjd</button>
        <img src={currentImage.imageUrl} alt="team-logo" className="team-logo" ></img>
        
      </div>
        
    )
    
        
}







