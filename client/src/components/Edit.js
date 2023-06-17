import React,{useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
 import {NavLink} from 'react-router-dom';

const Edit=()=>{

  // const [getuserdata,setUserdata]=useState([]);
  // console.log(getuserdata);

  const navigate=useNavigate();

    const [inpval,setINP]=useState({
        name:"",
        email:"",
        number:"",
        nic:"",
        address:"",
    
       })
    
    
    
    
       
       const setdata=(e)=>{
        //console.log(e.target.value);
        const{name,value}=e.target;
        setINP((preval)=>{
            return{
                ...preval,
                [name]:value
            }
    
        })
        
       }


       const {id} =useParams("");
  //console.log(id);

   
 

 
 
 const getdata = async () => {


   const res = await fetch(`/getuser/${id}`,{
       method: "GET",
       headers: {
           "Content-Type": "application/json"
       }, 
       
   });

   const data = await res.json();
  // console.log(data);

   if (res.status === 422|| !data) {
       //console.log("error ");

   } else {
    setINP(data);
       //console.log("get data");

   }
}



  useEffect(()=>{
    getdata();
  },[]);

   
    const updateuser=async(event)=>{
      event.preventDefault();

      const {name,email,number,nic,address}=inpval;
     

      


      const res2=await fetch(`/updateuser/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
          name,email,number,nic,address
        })
        
    });
       console.log(res2);
     const data2= await res2.json();
  
     if(res2.status===422||!data2){
        if(res2.status===422||!data2){
      alert("fill all entries data");
      navigate("/");
        }
        

     }
     
       else{
        if(res2.status===400){
            alert("Please enter valid email");
            navigate("/");
          
        }
        else{
      //console.log(data2.name);
      alert("data added");
      navigate("/");
        }
     }

    }





    return(
        <>
        <div className='container'>
        <h1 > Edit Employee <span> <NavLink  to="/"><button className='crossbotton'>X</button></NavLink></span></h1>
        <hr/>    
                <form>
      <div class="form-group mb-4">
      <label> Name</label>
          <input type="text" class="form-control bg-white text-dark" name="name" value={inpval.name}  onChange={setdata}  id="name" aria-describedby="name" placeholder="Enter name"/>
       </div>  

  <div class="form-group mb-4">
    <label> Email</label>
    <input type="email" class="form-control bg-white text-dark" name="email"  value={inpval.email}  onChange={setdata}  id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div class="form-group mb-4">
  <label> Number</label>
    <input type="text" class="form-control bg-white text-dark" name="number"  value={inpval.number}  onChange={setdata}  id="number" placeholder="Enter number"/>
  </div>
  <div class="form-group mb-4">
  <label> NIC</label>
    <input type="text" class="form-control bg-white text-dark" name="nic" value={inpval.nic}  onChange={setdata}  id="nic" placeholder="Enter NIC"/>
  </div>
  <div class="form-group mb-4">
  <label> Address</label>
          <input type="text" class="form-control bg-white text-dark" name="address"  value={inpval.address}  onChange={setdata}  id="address" aria-describedby="name" placeholder="Enter address"/>
       </div>  
  <button type="submit" onClick={updateuser} class="btn btn-warning" >Edit Employee</button>
</form>
<hr/>
<NavLink  to="/"><button className='ct'>Close</button></NavLink>

            </div>


        </>
    )
}

export default Edit;