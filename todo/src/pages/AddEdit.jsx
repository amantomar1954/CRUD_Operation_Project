import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigate,useParams,Link} from "react-router-dom"
import "./AddEdit.css";
import { toast } from 'react-toastify';
import axios from "axios"

const initialstate={
    name:"",
    email:"",
    contact:""
};


const AddEdit = () => {
    const [state,setState]=useState(initialstate);

    const {name,email,contact}=state;

    const navigate=useNavigate();

    const {id}=useParams();

    useEffect(()=>{
            axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp)=>setState({...resp.data[0]}));
    },[id])

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name ||!email || !contact){
            toast.error("place provide a value into each input field")
        }else{
            if(!id){
                axios.post("http://localhost:5000/api/post",{
                    name,
                    email,
                    contact,
                }).then(()=>{
                    setState({name:"",email:"",contact:""})
                }).catch((err)=>toast.error(err.response.data));
                toast.success("contact added successfully");

            }else{
                axios.put(`http://localhost:5000/api/update/${id}`,{
                    name,
                    email,
                    contact,
                }).then(()=>{
                    setState({name:"",email:"",contact:""})
                }).catch((err)=>toast.error(err.response.data));
                toast.success("contact added successfully");

            }
                
           
            setTimeout(()=>navigate("/"),500)
        }
    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value});
    }

  return (
    <div style={{marginTop:"100px"}}>
        <form action="" style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"
        }} 
        onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name='name' placeholder='your name >>> ' value={name}
            onChange={handleInputChange} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name='email' placeholder='your email >>> ' value={email}
            onChange={handleInputChange} />
            <label htmlFor="contact">Contact</label>
            <input type="number" id="contact" name='contact' placeholder='your contact >>> ' value={contact}
            onChange={handleInputChange} />

            <input type="submit" value={id ? "update" : "save"} />
            <Link to="/">
                <input type="button" value="go back" />
            </Link>
        </form>
       
    </div>
  )
}

export default AddEdit