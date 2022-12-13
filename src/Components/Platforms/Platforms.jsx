import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';





export default function Platforms() {
  let [gameList, setGameList] = useState([])
  let params=useParams();

let options = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: {platform: params.type},
  headers: {
    'X-RapidAPI-Key': 'bcf01d03cbmsh149668e9058105ap1e5e3djsnc9e0c8202f3e',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

let getGameByPlatform=async()=>{
  axios.request(options).then(function (response) {
    setGameList(response.data)
   
  }).catch(function (error) {
    console.error(error);
  });
 
}
getGameByPlatform();
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>{params.type}</title>
                
            </Helmet>
  {gameList.length>0?<><div>
    <div className="row g-3 mt-5 py-5">
      {gameList.map((game,index)=> <div key={index} className='col-lg-3 col-md-4 '>
      <Link className='nav-link' to={`/details/${game.id}`}>
      <div className="card  card-bg">
    <img src={game.thumbnail} className="card-img-top" alt="..."/>
    <div className="card-body">
      <div className=' d-flex justify-content-between align-items-center'>
      <h5 className="card-title">{game.title?.split("").slice(0,15).join("")}</h5>
      <span className="badge text-bg-primary">Free</span>
      </div>
      <p className="gameDetails">{game.short_description?.split("").slice(0,51).join("")}...</p>
    </div>
    <div className="card-footer d-flex justify-content-between ">
    <i className="fas fa-plus-square"></i>
      <div>
      <span className="badge text-bg-secondary  me-2">{game.genre}</span>
      {game.platform=="PC (Windows)"?<i  title="Available on Windows" className="fab fa-windows text-muted stretched-link"></i>:<i  title="Available on Browser" className="fas fa-window-maximize text-muted stretched-link"></i>}
      </div>
      
    </div>
  </div>
  </Link>
        
        </div>
      )}
   
    </div>
  
  </div>
  </>:<Loading/>}
  </>
    
  )
}
