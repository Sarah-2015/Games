import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function Details() {
    let [itemDetails, setItemDetails] = useState({})
    let params=useParams();

    let options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
        params: {id: params.id},
        headers: {
          'X-RapidAPI-Key': 'bcf01d03cbmsh149668e9058105ap1e5e3djsnc9e0c8202f3e',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };

      useEffect(() => {
        getGameDetails();
      
      
      }, [])
      

      let getGameDetails=async()=>{
        axios.request(options).then(function (response) {
          setItemDetails(response.data)
          console.log(response.data);
         
        }).catch(function (error) {
          console.error(error);
        });
      }
      
  return (
    <div>
        <div className="row py-5">
            <div className="col-md-3">
            <img className='w-100 h-50' src={itemDetails.thumbnail}/>
            <div  className="col me-0 pe-0">
                <a type="button" name="playnow" rel="nofollow" target="_blank" className="btn btn-primary btn-block w-50  py-2 my-2" href={itemDetails.game_url}>
                    <strong >PLAY NOW </strong><i className="fas fa-sign-out-alt"></i>
                    </a>
                    </div>

            </div>
            <div className="col-md-9 px-2">
                <h1>{itemDetails.title}</h1>
                <h5></h5>
                <p>{itemDetails.description}</p>
                <div>
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner p-5">
    {itemDetails.screenshots?.map((item,index)=><div key={index} className="carousel-item active">
      <img src={item.image} className="d-block w-100" alt="..."/>
    </div>)}
  
    
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
                </div>
            </div>
        </div>
    </div>
  )
}
