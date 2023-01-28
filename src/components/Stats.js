import React from "react";
import imageData from "../teamLogo"
import { useContext } from "react";
import { ImageContext } from "../ImageContext";

let home;
let away;
export default function Stats()
{
  const {currentImage, setCurrentImage} = useContext(ImageContext);
        const [currentGame, setCurrentGame] = React.useState({
            gameDate: "",
            homeTeam: "",
            homeTeamId: "",
            awayTeam: "",
            awayTeamId: "",
            homeScore: "",
            awayScore: ""
            
          })
          
          const [allGames, setAllGames] = React.useState([]);
         
          function getGame(){
            const randNumber = Math.floor(Math.random() * allGames.length)
            const gDate = allGames[randNumber].date;
            const home = allGames[randNumber].home_team.full_name;
            const hID = allGames[randNumber].home_team.id;
            const away = allGames[randNumber].visitor_team.full_name;
            const aID = allGames[randNumber].visitor_team.id;
            const hScore = allGames[randNumber].home_team_score;
            const aScore = allGames[randNumber].visitor_team_score;
        
            const tempDate = new Date(gDate)
            const formDate = tempDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })
            setCurrentGame(prevState =>({
              gameDate: formDate,
              homeTeam: home,
              homeTeamId: hID,
              awayTeam: away,
              awayTeamId: aID,
              homeScore: hScore,
              awayScore: aScore
            }))
            
          
          
          } 
          const [currentPage, setCurrentPage] = React.useState(1);
          const randPage= Math.floor(Math.random() *50)
          
          React.useEffect(() =>{
            fetch(`https://www.balldontlie.io/api/v1/games/?seasons[]=2022&page=${randPage}`)
            .then(res => res.json())
            .then(data => setAllGames(data.data))

        },[])
                  
        console.log(randPage)
          function RetrieveHomeImage(props){
            const {currentImage, setCurrentImage} = useContext(ImageContext);
          
            const [allLogos]= React.useState(imageData.data)
              
            home =function getHomeLogo (){
                  
              const HomeUrl = allLogos[props.currentTeamId-1].url
              const HomeId = allLogos[props.currentTeamId-1].id
             
             setCurrentImage(prevImg => ({
                  ...prevImg,
                  imageId: HomeId,
                  imageUrl: HomeUrl,
                 
                  
              }))
            }
              return(
                <div>
                   
                    <img src={currentImage.imageUrl} alt="team-logo" className="team-logo" ></img>
               </div>
              )
          

          
        }

        function RetrieveAwayImage(props){
          const {currentImage, setCurrentImage} = useContext(ImageContext);
        
          const [allLogos]= React.useState(imageData.data)
            
         away=  function getAwayLogo (){
                
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
             
              <img src={currentImage.awayimageUrl} alt="team-logo" className="team-logo" ></img>
          </div>
        )
    }
        

     async function all(){
         await getGame();
          console.log(currentImage)
          if(currentImage.awayimageUrl !== null){
          home();
          away();
          }else{
            console.log("EMPTY")
          }

          
        }
        
        let awayScoreText;
        if(currentGame.awayScore === 0){
          awayScoreText = ""
        }else if(currentGame.awayScore > currentGame.homeScore){
          awayScoreText = "W";
        }else{
          awayScoreText = "L"
        }

        let homeScoreText;
        if(currentGame.homeScore === 0){
          homeScoreText = ""
        }else if(currentGame.homeScore > currentGame.awayScore){
          homeScoreText = "W";
        }else{
          homeScoreText = "L"
        }

          return (
            <div className="stats">
              
               <button onClick = {all} className="game-button">Get Game</button>
                <h1 className="game-date">{currentGame.gameDate}</h1>
                
                <div className="home-stats">
                  <h1 className="home-label">Home</h1>
                    <RetrieveHomeImage currentTeamId={currentGame.homeTeamId} />
                     <h1>{currentGame.homeTeam}</h1>
                     <h2>{(currentGame.homeScore ===0 && currentGame.awayScore ===0) ? "Coming Soon" :currentGame.homeScore}</h2> 
                     <h1> {homeScoreText}</h1>
                </div>
               
                <div className="away-stats">
                   <h1 className="away-label">Away</h1>
                    <RetrieveAwayImage currentTeamId = {currentGame.awayTeamId} />
                    <h1>{currentGame.awayTeam}</h1>
                    <h2>{(currentGame.homeScore ===0 && currentGame.awayScore ===0) ? "Coming Soon" : currentGame.awayScore}</h2>
                    <h1>{awayScoreText}</h1>
                  
                </div>

               
            </div>
          );
    
}
