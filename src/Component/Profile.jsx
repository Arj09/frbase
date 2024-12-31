import React, { useEffect, useState } from "react";
import BookDataService from "../Component/service"


export const Profile = ()=>{
    const [data, setData] = useState([])
    const [item, setItem] = useState({})
    const [show, setShow] = useState(false)
    const [change, setChange] = useState(1)
    const [message, setMessage] = useState({ error: false, msg: "" });
     


    const handleItem =(e)=>{
        
        const name = e.target.name;
        const value =e.target.value;
        setItem(item=>({...item, [name]:value}))

    }

    useEffect(()=>{
        getBooks()

    }, [change])

    

    const getBooks = async()=>{
            const data = await BookDataService.getAllBook()
            console.log(data.docs)
            setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data, "data enble")
    } 
    
    
    
    
   

    const handleAdd = async(e)=>{
        console.log(item)
            e.preventDefault()
            setChange(change=>change+1)
            
            setMessage("");
            if (item.name === "" ) {
                setMessage({ error: true, msg: "All fields are mandatory!" });
                return;
            }
    
            
            try {
                await BookDataService.addBooks(item)
                setMessage({ error: false, msg: "New Book added successfully!" }); 
            }
            catch (err) {
                setMessage({ error: true, msg: err.message });
            
            }

            setItem({name:"",quantity:"", starting_date:"" })
    
                  
            
    
        }








    return(
        <div>
            <div className=" w-5/5 h-24 bg-red-600">

            </div>

            <form onSubmit={handleAdd} className=" w-2/5 mx-auto border-2 border-red-600 px-4 py-2 my-5 rounded">
              
                <div className= "  flex flex-col gap-y-4 justify-between">
                    <input  placeholder=" Enter Item name" className=" rounded border-2 border-gray-400 py-2 px-1" name="name" value={item.name} onChange={handleItem}  />
                    <input type="number"  placeholder=" Enter Item quantity" className="  rounded border-2 border-gray-400 py-2 px-3" name="quantity" value={item.quantity} onChange={handleItem}  />
                    <div className=" flex flex-row justify-between">
                        <text>Starting Date</text>
                        <input type="date" placeholder=" Enter date" className=" rounded border-2 border-gray-400 py-2 px-1" name="date"  value={item.starting_date} onChange={handleItem} />

                    </div>
                    
                </div>
                <div className=" flex flex-row justify-center">
                    <button className=" bg-slate-700 text-white rounded px-2 py-2 my-2">Add Item</button>
                </div>

            </form>

           
            <div className=" w-5/5 md:w-4/5      flex flex-col mx-auto rounded my-2 ">
                <div className="grid grid-cols-6 justify-between gap-x-3 my-2 px-2 border-2 border-blue-500 rounded py-2 bg-blue-500 text-white  ">
                                <text>Item Name</text>
                                <text>Quantity</text>
                                <text>Start date</text>
                                <text>Sumbit date</text>
                                <text>Day</text>
                                <text>Amount</text>


                </div>

                {
                    data.map((data, index)=>{
                        return(
                            <div className="grid grid-cols-6 justify-between gap-x-3 my-2 px-2 border-2 border-blue-500 rounded py-1  ">
                                <text>{data.name}</text>
                                <text>{data.quantity}</text>
                                <text>{data.date}</text>
                                <text>{data.date}</text>
                                <text>2</text>
                                <text>50</text>


                            </div>
                        )
                    })
                }

                
            </div>

        </div>
    )
}