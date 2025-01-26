import React, { useEffect, useState } from "react";
import BookDataService from "./Controller/service"
import UserDataService from "./Controller/user"
import { useNavigate } from "react-router-dom";


export const Profile = ()=>{
    const [data, setData] = useState([])
    const [item, setItem] = useState({})
    const [show, setShow] = useState(false)
    const [change, setChange] = useState(1)
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [create, setCreate]= useState([])
    const [pending, setPending] = useState([])
    const [Complete, setComplete] = useState([])
    const [user ,setUser] = useState({})
    const [user1 ,setUser1] = useState([])
    const navigate = useNavigate()
    



    const handleUser = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUser(user=>({...user, [name]:value}))
    } 
    /*

    const handleAddUser =(e)=>{
        e.preventDefault()
        setUser1(user1=>([...user1, user]))
        setUser({name:"", mobile:"", address:''})
        setShow(false)


    }*/

     


    const handleItem =(e)=>{
        
        const name = e.target.name;
        const value =e.target.value;
        setItem(item=>({...item, [name]:value}))

    }

    useEffect(()=>{
        getBooks()

    }, [change])

    

    const getBooks = async()=>{
            const data = await UserDataService.getAllUser()
            console.log(data.docs)
            setUser1(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(user1)
    } 
    
    
    
    
   

    const handleAddUser = async(e)=>{
        console.log(item)
            e.preventDefault()
            setChange(change=>change+1)
            setMessage("");
            if (user.name === "" ) {
                setMessage({ error: true, msg: "All fields are mandatory!" });
                return;
            }
    
            
            try {
                await UserDataService.addUsers(user)
                setMessage({ error: false, msg: "New Book added successfully!" });
                setShow(false) 
            }
            catch (err) {
                setMessage({ error: true, msg: err.message });
            }

            setItem({name:"",quantity:"", starting_date:"" })
    
            }








    return(
        <div>
            <div className=" w-5/5 h-20 bg-red-600"></div>
                
            <text className=" justify-center mx-auto bg-red-600 text-white py-2 mt-4 rounded w-4/5 flex flex-row"> All Available Item</text>

            <div className=" grid grid-cols-1 grid-rows-1 sm:grid-cols-3 w-4/5 mb-2 p-2 gap-4  bg-red-600 rounded mx-auto  ">
                <div className=" w-5/5 flex flex-col p-2 border-2 border-red-500 bg-red-500 rounded">
                   <div className=" flex flex-row justify-between bg-blue-600 text-white rounded p-2 ">
                        <text>Item name</text>
                        <text>Total/ Available </text>
                    </div>
                    <div className=" flex flex-row justify-between text-white rounded p-2 ">
                        <text>Chehali</text>
                        <text>10/ 2</text>
                    </div>
                    
                </div>

                <div className=" w-5/5 flex flex-col p-2 border-2 border-red-500 bg-red-500 rounded">
                   <div className=" flex flex-row justify-between bg-blue-600 text-white rounded p-2 ">
                        <text>Item name</text>
                        <text>Total/ Available </text>
                    </div>
                    <div className=" flex flex-row justify-between text-white rounded p-2 ">
                        <text>Chehali</text>
                        <text>10/ 2</text>
                    </div>
                    
                </div>

                <div className=" w-5/5 flex flex-col p-2 border-2 border-red-500 bg-red-500 rounded">
                   <div className=" flex flex-row justify-between bg-blue-600 text-white rounded p-2 ">
                        <text>Item name</text>
                        <text>Total/ Available </text>
                    </div>
                    <div className=" flex flex-row justify-between text-white rounded p-2 ">
                        <text>Chehali</text>
                        <text>10/ 2</text>
                    </div>
                    
                </div>
                

            </div>

         

           

            <div className=" w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-3 grid-rows-1  px-2 py-2 my-5 gap-x-3 gap-y-4  border-blue-700 rounded ">
                

                <div className=" flex flex-col w-5/5  gap-y-2    rounded px-2 py-2">
                
                    <text className=" rounded w-5/5  py-2 px-2 text-center bg-red-600 text-white">Create</text>
                    <text className=" cursor-pointer rounded w-5/5  py-2 px-2 text-center bg-blue-600 text-white" onClick={()=>setShow(true)}>Create Profile</text>

                    
                    {
                        user1?.map((data ,index)=>{
                            return(
                                <div className=" w-5/5 flex flex-col  gap-y-2 border-2 border-blue-600  rounded p-2 text-white">
                                    <text className=" text-blue-600 font-medium">{`Username : ${data.name}`}</text>
                                    <text className=" text-blue-600 font-medium">total Item : 5</text>
                        
                                    <div className=" flex flex-row gap-y-2 gap-x-2 ">
                                        <button className=" py-2 px-2 bg-blue-600 rounded">{data.id == "R4dB0P7PEDHGShbpYMrp" ? "match" :'cancel'}</button>
                                        <button className=" py-2 px-2 bg-blue-600 rounded" onClick={()=>navigate("/detail")}>Detail</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className=" flex flex-col w-5/5  gap-y-2    rounded px-2 py-2">
                
                    <text className=" rounded w-5/5  py-2 px-2 text-center bg-red-600 text-white">Pending</text>
                    <div className=" w-5/5 flex flex-col  gap-y-2 border-2 border-blue-600  rounded p-2 text-white">
                        <text className=" text-blue-600 font-medium">Username : Arjun kushwah</text>
                        <text className=" text-blue-600 font-medium">total Item : 5</text>
                        <div className=" flex flex-col gap-y-2 gap-x-2 ">
                            <button className=" py-2 bg-blue-600 rounded">Payment Pending</button>
                            <button className=" py-2 bg-blue-600 rounded">All Item Received</button>
                        </div>
                    </div>

                </div>

                <div className=" flex flex-col w-5/5  gap-y-2    rounded px-2 py-2">
                
                    <text className=" rounded w-5/5  py-2 px-2 text-center bg-red-600 text-white">Complete</text>
                    <div className=" w-5/5 flex flex-col  gap-y-2 border-2 border-blue-600  rounded p-2 text-white">
                        <text className=" text-blue-600 font-medium">Username : Arjun kushwah</text>
                        <text className=" text-blue-600 font-medium">total Item : 5</text>
                        <div className=" flex flex-col gap-y-2 gap-x-2 ">
                            
                            <button className=" py-2 bg-blue-600 rounded">Detail</button>
                        </div>
                    </div>

                </div>
                
                
            </div>


            {
                show && (
                    <form onSubmit={handleAddUser} className=" absolute w-3/5 border-2 flex flex-col gap-y-2 px-4 py-4 border-red-800 rounded h-72 bg-white left-0 right-0 top-0 bottom-0 m-auto">
                        <text className=" text-right font-medium pr-3 pb-3 cursor-pointer" onClick={()=>setShow(false)}>X</text>
                        <input placeholder=" Enter name" className=" rounded border-2 border-gray-400 py-2 px-1"  name="name" value={user.name} onChange={handleUser} />
                        <input placeholder=" Enter mobile no" className=" rounded border-2 border-gray-400 py-2 px-1"  name="mobile" value={user.mobile} onChange={handleUser} />
                        <input placeholder=" Enter Address" className=" rounded border-2 border-gray-400 py-2 px-1"  name="address" value={user.address} onChange={handleUser} />
                        <button className=" py-2 bg-blue-600 rounded text-white">Add User</button>
                    </form>
                )
            }





            

            
           
          

           

            

        </div>
    )
}