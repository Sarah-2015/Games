import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Loading from '../Loading/Loading';




export default function Home() {
  
  let [gameList, setGameList] = useState([])

const options = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  headers: {
    'X-RapidAPI-Key': 'bcf01d03cbmsh149668e9058105ap1e5e3djsnc9e0c8202f3e',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

useEffect(() => {
  getGameList();
 
  

}, [])


let getGameList=()=>{
  axios.request(options).then(function (response) {
   
    
    setGameList(response.data)
    console.log(gameList);
    
   
  }).catch(function (error) {
    console.error(error);
  });
 
}

  return (
    <>
      
        <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                
            </Helmet>
    {gameList.length>0?<><section className="jumbotron text-center pt-5 pb-4">
      <div  className="container mb-n2">
        <h1  className="text-info">Find &amp; track the best <span  className="ftg-blue">free-to-play</span> games!</h1>
        <p  className="lead text-muted">Track what you've played and search for what to play next! Plus get free premium loot! </p>
        <p ><Link  role="button" className="btn btn-outline-info btn-md ml-0" to={"all"} >Browse Games</Link></p>
     </div>
     </section>
       
       
      <div className="row g-3 py-1 gustify-content-center">
      <h3><i className="fas fa-robot mr-2"></i>Personalized Recommendations</h3>

        {gameList.slice(1,4).map((game,index)=> <div key={index} className='col-md-4'>
        <Link className='nav-link' to={`/details/${game.id}`}>
        <div className="card h-100 card-bg">
      <img src={game.thumbnail} className="card-img-top" alt="..."/>
      <div className="card-body ">
        <div className=' d-flex justify-content-between align-items-center'>
        <h5 className="card-title">{game.title?.split(" ").slice(0,3).join(" ")}</h5>
        <span className="badge text-bg-primary">Free</span>
        </div>
      
      </div>
      <div className="card-footer mt-0 d-flex justify-content-between ">
      <i  className="fas fa-plus-square"></i>
        <div>
        <span className="badge text-bg-secondary  me-2">{game.genre}</span>
        {game.platform=="PC (Windows)"?<i  title="Available on Windows" className="fab fa-windows text-muted stretched-link"></i>:<i  title="Available on Browser" className="fas fa-window-maximize text-muted stretched-link"></i>}
        </div>
        
      </div>
    </div>
    </Link>
          
          </div>
        )}
     
      </div></>:<Loading/>}
    
    
    
    </>
 
  )
}
