import React, { useState, useEffect } from "react";
import BookDataService from "./Controller/service"
import { useNavigate, useSearchParams } from "react-router-dom";



export const Detail =()=>{

    const [data, setData] = useState([])
    const [change, setChange] = useState(1)
    const [product, setProduct] = useState({})
    const navigate = useNavigate()



    const handleProduct = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setProduct(user=>({...user, [name]:value}))
    }

    const handleAddProduct = (e)=>{

        e.preventDefault()
        setProduct({name:"", qty:"", date:""})
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
    return(
        <div>
            <div className=" flex flex-row mx-auto w-4/5 my-4 ">
                <button className=" px-1.5 py-2 bg-red-700 text-white rounded" onClick={()=>navigate("/")}>Back to home</button>

            </div>
            <div className=" flex flex-col ga-p-y-2 rounded px-2 py-4 my-4 w-4/5 bg-red-700 text-white mx-auto">
                
                <div className=" flex flex-row gap-x-5">
                    <text>{`Username : Arjun kushwah`}</text>
                    <text>{`Adddress : Gwalior`}</text>
                </div>
                <text>{`Mobile No : 934005035`}</text>

            </div>

            <form onSubmit={handleAddProduct} className=" w-4/5 grid grid-rows-1 grid-cols-1 sm:grid-cols-4 mx-auto gap-2 p-2 border-2 border-red-500 rounded ">
                <select className=" border-2 border-red-500 py-2 px-1 rounded" name="name" value={product.name} onChange={handleProduct} >
                    <option>Select Item</option>
                    <option>Chehli</option>
                </select>
               
                <input type="number" placeholder=" Enter Qty" className=" rounded border-2 border-gray-400 py-2 px-1" name="qty" value={product.qty} onChange={handleProduct}  />
                <input type="date" placeholder=" Enter Date" className=" rounded border-2 border-gray-400 py-2 px-1" name="date" value={product.date} onChange={handleProduct}  />
                <button className=" px-1 py-1.5 bg-red-600 text-white rounded">Add</button>


            </form>
            

            <div className=" w-11/12 sm:w-4/5  flex flex-col mx-auto rounded my-2    ">
                <div className="grid grid-cols-6 justify-between gap-x-3 my-2 px-2 border-2 border-blue-500 rounded py-2 bg-blue-500 text-white  ">
                                <text>Item Name</text>
                                <text>Qty</text>
                                <text>Start date</text>
                                <text>Sumbit date</text>
                                <text>Day</text>
                                <text>Amount</text>


                </div>
                <div className=" overflow-y-scroll h-96 ">

                {
                    data.map((data, index)=>{
                        return(
                            <div className="grid grid-cols-6 justify-between gap-x-3 my-2 px-2 border-2 border-blue-500 rounded py-1   ">
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

            <div className=" w-4/5 bg-red-700 mx-auto flex flex-col  p-4 my-8 rounded text-white ">
                <text className=" text-right">{`Total Amount : 56000`}</text>
                <text className=" text-right">{`Receive Amount : 0`}</text>
                <text className=" text-right">{`Pending Amount : 56000`}</text>
                
                

            </div>

        </div>
    )
}