import React from 'react'
import Lottie from "lottie-react";
import LoadingPage from './../../assets/lottiFiles/loading.json'
import LoadingComponant from './../../assets/lottiFiles/Loading Dots Blue.json'

function LottiHandeler({ ststue }) {
  return (
    <div className="LottiHandeler vh-100 w-100 ">
      <div className="w-50 m-auto ">
        {ststue === "main" ? 
          <Lottie animationData={LoadingPage} loop={true} />
         :  ststue ==="comp"? <Lottie animationData={LoadingComponant} loop={true} />
         : ''
        }
      </div>
    </div>
  );
}

export default LottiHandeler