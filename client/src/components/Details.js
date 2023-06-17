 import React,{useState,useEffect} from "react";
 import {useParams} from 'react-router-dom';
 import {NavLink} from 'react-router-dom';


 const Details=()=>{

  const [getuserdata,setUsersdata]=useState([]);
 //console.log(getuserdata);
  
  
  const {id} =useParams("");
  //console.log(id);

   
 

 
 
 const getdata = async () => {


   const res = await fetch(`/getuser/${id}`, {
       method: "GET",
       headers: {
           "Content-Type": "application/json"
       },
       
   });

   const data = await res.json();
   //console.log(data);

   if (res.status === 422|| !data) {
       //console.log("error ");

   } else {
     setUsersdata(data);
       //console.log("get data");

   }
}

  
 useEffect(()=>{
  getdata();
 })






    return(
        <>
        <div className='container'>
                {/* <NavLink to='/' > home</NavLink> */}
                <h1 > View Employee Data <span> <NavLink  to="/"><button className='crossbotton'>X</button></NavLink></span></h1>
                <hr/>
                <form class="mt-5">


      
       

       {/* showing data manually inserted by user */}

      <div class="form-group mb-4 ">
          <input type="text"  class="form-control" name="name"   id="name" aria-describedby="name" placeholder="Enter name" value={getuserdata.name} readonly />
         
          
       </div>  

  <div class="form-group mb-4">
    <input type="email" class="form-control" name="email"    id="email" aria-describedby="emailHelp" placeholder="Enter email" value={getuserdata.email} readonly/>
    
  </div>
  <div class="form-group mb-4">
    <input type="text" class="form-control" name="number"     id="number" placeholder="Enter number" value={getuserdata.number} readonly/>
  </div>
  <div class="form-group mb-4">
    <input type="text" class="form-control" name="nic"   id="nic" placeholder="Enter NIC" value={getuserdata.nic} readonly/>
  </div>
  <div class="form-group mb-4">
          <input type="text" class="form-control" name="address"      id="address" aria-describedby="name" placeholder="Enter address" value={getuserdata.address} readonly/>
       </div> 

       



       <NavLink  to="/"><button className='ct'>Close</button></NavLink></form>
            </div>

        </>
    )
 }

 export default Details;