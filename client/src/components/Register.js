import React, {useState} from 'react';
 import {NavLink,useNavigate} from 'react-router-dom';
const Register=()=>{


    const navigate=useNavigate();


   const [inpval,setINP]=useState({
    name:"",
    email:"",
    number:"",
    nic:"",
    address:"",

   })




   
   const setdata=(e)=>{
   // console.log(e.target.value);
    const{name,value}=e.target;
    setINP((preval)=>{
        return{
            ...preval,
            [name]:value
        }

    })
    
   }

   
   const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, number, nic, address } = inpval;

    const res = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, number, nic, address        })
    });

    const data = await res.json();
    //console.log(data);

  
   

  if (res.status === 422 || !data||res.status===404) {
    
     if(res.status===422||!data){
   // console.log("error ");
    alert("Please fill all the entries");
    navigate("/");
     }
     if(res.status===404){
      alert("email id already exits");
    navigate("/");
     }
    
}else {
        alert("data added");
        navigate("/");

      //  console.log("data added");

    }
}
   
   
    return(
        <>
            <div className='container'>
                {/* <NavLink to='/' > home</NavLink> */}
                <h1 > Add new Employee <span> <NavLink  to="/"><button className='crossbotton'>X</button></NavLink></span></h1>
                <hr/>
                <form>
      <div class="form-group mb-4">
          <input type="text" class="form-control bg-white text-dark" name="name" value={inpval.name}  onChange={setdata}  id="name" aria-describedby="name" placeholder="Enter name"/>
       </div>  

  <div class="form-group mb-4">
    <input type="email" class="form-control bg-white text-dark" name="email"  value={inpval.email}  onChange={setdata}  id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div class="form-group mb-4">
    <input type="text" class="form-control bg-white text-dark" name="number"  value={inpval.number}  onChange={setdata}  id="number" placeholder="Enter number"/>
  </div>
  <div class="form-group mb-4">
    <input type="text" class="form-control bg-white text-dark" name="nic" value={inpval.nic}  onChange={setdata}  id="nic" placeholder="Enter NIC"/>
  </div>
  <div class="form-group mb-4">
          <input type="text" class="form-control bg-white text-dark" name="address"  value={inpval.address}  onChange={setdata}  id="address" aria-describedby="name" placeholder="Enter address"/>
       </div>  
  <button type="submit" onClick={addinpdata} class="btn btn-success">Add Employee</button>
  <hr/>
</form>
<NavLink  to="/"><button className='ct'>Close</button></NavLink>

            </div>
        </>
    )
}

export default Register;