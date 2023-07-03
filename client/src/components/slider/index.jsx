const Slider = () => {
  return (
    <div className="d-flex container slider">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active  w-100">
            <img className="d-block w-100" style={{ height: "292px" }} src="https://cdn0.fahasa.com/media/magentothem/banner7/TrangTapVoT623_Banner_Slide_840x320.jpg" alt="First slide" />
          </div>
          <div className="carousel-item  w-100">
            <img className="d-block w-100" style={{ height: "292px" }} src="https://cdn0.fahasa.com/media/magentothem/banner7/HoaCuQuy_Banner_840x320_T623.jpg" alt="Second slide" />
          </div>
          <div className="carousel-item  w-100">
            <img className="d-block w-100" style={{ height: "292px" }} src="https://cdn0.fahasa.com/media/magentothem/banner7/ThienLong_Platinum_BannerVer1_Slide_840x320.jpg" alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div className="ml-2">
        <img src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/73/2f/0e/abe6c09cacff1922a5a4239d64651fcd.png.webp" alt="" style={{ width: "400px", height: "292px" }} />
      </div>
    </div>
  );
};
export default Slider;
