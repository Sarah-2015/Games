import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Loading from '../Loading/Loading';


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
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{itemDetails.title}</title>
                
            </Helmet>
    {itemDetails.title?<>
        <div className="row py-5 mt-5 ">
            <div className="col-md-3">
            <img className='w-100 ' src={itemDetails.thumbnail}/>
            <div  className="col me-0 pe-0">
                <a type="button" name="playnow" rel="nofollow" target="_blank" className="btn btn-primary btn-block w-100  py-2 my-2" href={itemDetails.game_url}>
                    <strong >PLAY NOW </strong><i className="fas fa-sign-out-alt"></i>
                    </a>
                    </div>

            </div>
            <div className="col-md-9 ">
                <h1 className='text-info'>{itemDetails.title}</h1>
                <h5>About {itemDetails.title}</h5>
                <p className=''>{itemDetails.description}</p>
                <h4 className='text-white mt-4'>Minimum System Requirements</h4>
                <ul  class="list-unstyled ms-2">
                  <li ><strong >Graphics : </strong>{itemDetails.minimum_system_requirements.graphics}</li>
                  <li><strong >Operating System : </strong>{itemDetails.minimum_system_requirements.os}</li>
                  <li ><strong >Processor : </strong>{itemDetails.minimum_system_requirements.processor}</li>
                  <li ><strong >Memory : </strong>{itemDetails.minimum_system_requirements.memory}</li>
        {itemDetails.minimum_system_requirements.storage!="?"?
        <li ><strong >Storage : </strong>{itemDetails.minimum_system_requirements.storage}</li>:""} 
                  </ul>
   
  <h4 className='text-white'>{itemDetails.title} Screenshots</h4>
  <div id="carouselExampleControls" className="carousel slide  " data-bs-ride="carousel">
  
  <div class="carousel-inner py-2">
    {itemDetails.screenshots?<><div  className="carousel-item active" data-bs-interval="500">
      <img src={itemDetails.screenshots[0].image} className="d-block w-100" alt="..."/>
    </div>
    <div  className="carousel-item " data-bs-interval="1500">
    <img src={itemDetails.screenshots[1].image} className="d-block w-100" alt="..."/>
  </div>
  <div  className="carousel-item " data-bs-interval="1500">
  <img src={itemDetails.screenshots[2].image} className="d-block w-100" alt="..."/>
</div></>:""}
  
    
   
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
<h4 className='py-3 text-white'>Additional Information</h4>
<div  className="row pb-3">
  <div  className="col-6 col-md-4"><span  className="fw-bolder text-info">Title<br /></span><p >A.V.A Global</p></div>
    <div  className="col-6 col-md-4"><span  className=" fw-bolder text-info">Developer<br /></span> NEOWIZ </div>
    <div  className="col-6 col-md-4"><span  className="fw-bolder text-info">Publisher<br /></span> NEOWIZ </div>
    <div  className="col-6 col-md-4"><span  className="fw-bolder text-info">Release Date<br /></span> 2022-08-24 </div>
    <div  className="col-6 col-md-4"><span  className="fw-bolder text-info">Genre<br /></span> MMOFPS </div>
    <div  className="col-6 col-md-4"><span  className="fw-bolder text-info">Platform<br /></span><i  className="fab fa-windows me-1"></i> Windows </div>
    </div>
                </div>
            
        </div>
    </>:<Loading/>}
    
    </>
  )
}
