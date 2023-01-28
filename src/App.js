import React, {useState, useMemo} from "react"
import Stats from "./components/Stats";
import Header from "./components/Header";
import { ImageContext } from "./ImageContext";

function App() {

  const [currentImage, setCurrentImage] = useState({
    imageId: "",
    imageUrl: "",
    currentTeamId: "",
    awayimageId: "",
    awayimageUrl: "",
    awaycurrentTeamId: ""
  })

  const providerValue = useMemo(()=> ({currentImage, setCurrentImage}), [currentImage, setCurrentImage])

  return(
    <div>
    <ImageContext.Provider value = {providerValue}>
    <Header />
    <Stats />
    </ImageContext.Provider>
    </div>
  )
  
}

export default App;
