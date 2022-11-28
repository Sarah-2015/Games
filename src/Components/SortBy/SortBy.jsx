import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading';



export default function SortBy() {
    let [gameList, setGameList] = useState([])
    let params=useParams();
    let options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        params: {'sort-by': params.sort},
        headers: {
          'X-RapidAPI-Key': 'bcf01d03cbmsh149668e9058105ap1e5e3djsnc9e0c8202f3e',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };
  
let sortGameBy=async()=>{
    axios.request(options).then(function (response) {
        setGameList(response.data)
        console.log(gameList);
    }).catch(function (error) {
        console.error(error);
    });
}
sortGameBy();

    
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{params.sort}</title>
                
            </Helmet>
   {gameList.length>0?<>
    <div className="row g-3 py-5">
      {gameList.map((game,index)=> <div key={index} className='col-lg-3 col-md-4 '>
      <Link className='nav-link' to={`/details/${game.id}`}>
      <div className="card  card-bg">
    <img src={game.thumbnail} className="card-img-top" alt="..."/>
    <div className="card-body">
      <div className=' d-flex justify-content-between align-items-center'>
      <h5 className="card-title">{game.title.split(" ").slice(0,3).join(" ")}</h5>
      <span className="badge text-bg-primary">Free</span>
      </div>
      <p>{game.short_description?.split(" ").slice(0,7).join(" ")}</p>
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
  
  </>:<Loading/>}
    
  </>
  )
}