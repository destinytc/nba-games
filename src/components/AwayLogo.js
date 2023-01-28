import React from "react";
import imageData from "../teamLogo"
import { useContext } from "react";
import { ImageContext } from "../ImageContext";


export default function AwayLogo (props) {
    const {currentImage, setCurrentImage} = useContext(ImageContext);
   
  
    const [allLogos, setAllLogos]= React.useState(imageData.data)
    
    function getLogo (){
        
        const AwayUrl = allLogos[props.currentTeamId-1].url
        const AwayId = allLogos[props.currentTeamId-1].id
       
       setCurrentImage(prevImg => ({
            ...prevImg,
            awayimageId: AwayId,
            awayimageUrl: AwayUrl,
           
            
        }))
        
        
    }
    

    return(

      <div>
        <button onClick={getLogo} className="logo-btn">hjdjjd</button>
        <img src={currentImage.awayimageUrl} alt="team-logo" className="team-logo" ></img>
      </div>
        
    )
    
        
}




