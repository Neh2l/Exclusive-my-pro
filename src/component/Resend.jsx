import React, { useRef} from 'react'
import ResendEmail from './../Apis/api'

const Resend = () => {

     const EmailRef = useRef();
   
   
    const handleEmail=(e)=>{
      e.preventDefault();
      const email =EmailRef.current.value ;
      ResendEmail(email);
    }

  return (
    <div>
      <form onSubmit={handleEmail}>
        <input
          type="text"
          placeholder="enter the email"
          className=" m-5 w-50"
          ref={EmailRef}
          
        />
      </form>
    </div>
  );
}

export default Resend