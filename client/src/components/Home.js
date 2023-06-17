import React,{useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';

const Home=()=>{
    
  const [getuserdata,setUsersdata]=useState([]);
  //console.log(getuserdata);

  
  
  const getdata = async (e) => {


    const res = await fetch("/getdata", {
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
  },[]);

  const deleteuser=async (id)=>{

    
     
    
    const res2= await fetch(`/deleteuser/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const deletedata=await res2.json();
    //console.log(deletedata);

    if(res2.status===422||!deletedata){
      //console.log('error');
    }else{
      //console.log("user deleted");
      getdata();
    }

  

   alert("data deleted");


  }
  
  
  

  
  
  
  return(
        <>
             <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-3">
                        <NavLink to='/register' className="btn btn-primary">Add New Employee</NavLink>
                    </div>
                    <table class="table table-striped table-bordered">
  <thead>
    <tr>
      {/* <th scope="col">Id</th> */}
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Number</th>
      <th scope="col">NIC</th>
      <th scope="col">Address</th>
      <th scope="col">Action</th>


    </tr>
  </thead>
  
  <tbody>

      
         
      
      
      {/* showing down data inserted manually by user */}
           
      {
       


          getuserdata.map((element,id)=>{
               return (
                <>
                <tr>
      {/* <th scope="row">{id+1}</th> */}
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.number}</td>
      <td> {element.nic}</td>
      <td>{element.address}</td>
      <td className="d-flex justify-content">
      <NavLink to={`view/${element._id}`}><button className="btn btn-primary" >View</button><span>|</span></NavLink>

      <NavLink to={`edit/${element._id}`}><button  className="btn btn-warning">Edit</button><span>|</span></NavLink>
      <button className="btn btn-danger" onClick={()=>deleteuser(element._id)}>Delete</button><span class="bar">|</span>
      </td>
    </tr>


                </>
               )
          })
      }




    

  
    
    
  </tbody>
</table>

                 </div>
            </div>
        </>
    )
}

export default Home;