import React from "react";
import firstimg from "../../img/venom.jpg";
import secondimg from "../../img/films-4k.jpg";
import thirdimg from "../../img/animebgimg.png";
import './css/home.css';

function Homepg() {
    return (
        <>

            <div id="carouselExampleAutoplaying" class="carousel slide " data-bs-ride="carousel"
                data-bs-interval="2500">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={firstimg} alt="first" class="d-block vh-100 vw-100" />
                        <div
                            class="carousel-caption d-flex justify-content-center align-items-center top-50 start-50 translate-middle vh-100 vw-100  ">
                            <div class="p-2 rounded-5">
                                <h1 class="h1">Welcome to <span class="text-warning">Cinema Time</span></h1>
                                <p class="h3">Your ultimate destination for movies, TV shows, and anime.</p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={secondimg} alt="first" class="d-block vh-100 vw-100" />
                        <div
                            class="carousel-caption d-flex justify-content-center align-items-center top-50 start-50 translate-middle vh-100 vw-100  ">
                            <div class="p-2 rounded-5">
                                <h1 class="h1">Step into <span class="text-warning">Cinema Time</span>,</h1>
                                <p class="h3">where every film, series, and anime is an adventure waiting to be explored.</p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="image-container">
                            <img src={thirdimg} alt="first" class="d-block vh-100 vw-100" />
                        </div>
                        <div
                            class="carousel-caption d-flex justify-content-center align-items-center top-50 start-50 translate-middle vh-100 vw-100  ">
                            <div class="p-2 rounded-5">
                                <h1 class="h1">Experience the magic of <span class="text-warning">Cinema Time</span>,</h1>
                                <p class="h3">where every movie, TV show, and anime tells a story that captivates the imagination.</p>

                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

        </>
    );
}
export default Homepg;