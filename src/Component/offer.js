import React, {useEffect, useState} from "react";
import ItemDataService from "../Component/Controller/item"
import CategoryDataService  from "../Component/Controller/category"
import TypeDataService from "../Component/Controller/type"
import category from "../Component/Controller/category";






export const Offer = () =>{

    const [cate, setcate] = useState()
    
    const [Type, setType] = useState()
    const [AddCate, setAddCate] = useState({})
    const [AddType, setAddType] = useState({})
    const [type, settype]= useState("All")
    const [show, setShow] = useState(true)
    const [item, setItem] = useState({})
    const [change, setChange] = useState(0)
    const [data, setData] = useState()
    const [CategoryS, setCategoryS] = useState("All")
    const [TypeS, setTypeS] = useState("All")
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [security, setSecurity] = useState(false)
    const [password, setPassword] = useState("Arjun")
    const [open, setOpen] = useState(false)
    const [valid, setValid ] = useState('')
    const [EditW, setEdit] = useState(false)
    const [updateItem, setUpdate] = useState({})
    const [itemID, setItemID] = useState()
    const [search, setSearch] = useState("All")
    




    useEffect(()=>{
        
        getCategory()
        getItems()
        getType()
        

    },[change])
    
    






    const getItems = async()=>{
        const data = await ItemDataService.getAllItem()
        data.docs.reverse()
        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        
    }

    const getCategory = async()=>{
        const data = await CategoryDataService.getAllCategory()
        setcate(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
       
    }

    const getType = async()=>{
        const data = await TypeDataService.getAllType()
        setType(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
       
    }

    const handleType = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setAddType(AddType=>({...AddType, [name]:value}))
    }

    const handleupdateItem = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setUpdate(updateItem=>({...updateItem, [name]:value}))
    }


    const handleCategory = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setAddCate(AddCate=>({...AddCate, [name]:value}))
    }


    const handleItem = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setItem(item=>({...item, [name]:value}))
    }

    const handleAddItem = async(e)=>{
        e.preventDefault();
        try{
            await ItemDataService.addItems(item)
            setChange(change=>change+1)
            setItem({name:'', price:"", mrp:"", category:"", type:"", quantity:""})
        }
        catch(err){
            setMessage({ error: true, msg: err.message})
        }

    }


    const handleAddCategory = async(e) =>{
        
        e.preventDefault()
       
        try{
           
            await CategoryDataService.addCategory(AddCate);
           
            setChange(change=>change+1)
            setAddCate({name:''})
            }
            catch (err) {
                
                setMessage({ error: true, msg: err.message }); 
            }
        }

    

    const handleAddType = async(e)=>{
        e.preventDefault()
        try{
            await TypeDataService.addType(AddType)
            setChange(change=>change+1)
            setAddType({name:'', category:''})
            
            
        }catch(err){
            setMessage({ error: true, msg: err.message }); 

        }

    }


    const handleChangeCate = (data)=>{
        setTypeS("All")
        setCategoryS(data)
        

    }

    const handleChangeType = ()=>{
        setTypeS(data)
    }

    const handleSearchType = (data)=>{
        setTypeS(data)

    }


    const handleSec = ()=>{
        security ? setSecurity(false) :setSecurity(true)
    }

    const handleCheck = (e)=>{
        e.preventDefault()
        if(valid == password){
            setOpen(true)
            setValid("")
        }

    }

    const handleUpdateItemDetail = async(e)=>{
        e.preventDefault()
        try{

            await ItemDataService.updateItem(itemID, updateItem)
            setChange(change=>change+1)
            setUpdate({name:"", quantity:"", mrp:""})
            setEdit(false)
        }catch (err) {
            setMessage({ error: true, msg: err.message }); 
            

            }


    }


    const handleEdit = (index,name, quantity,mrp, price)=>{

        if(index || name){
            EditW ? setEdit(false) : setEdit(true)
            setItemID(index)
            setUpdate({name:name, quantity:quantity, mrp:mrp, price:price})
        }
        EditW ? setEdit(false) : setEdit(true)

    }


    const handleDelete =async(index)=>{
        await ItemDataService.deleteItem(index)
        setChange(change=>change+1)
    }


   
    return(
        <>

        <div className=" w-5/5 bg-red-500 flex flex-row justify-between p-4 text-white">
            <text className=" text-3xl">MiniMart</text>
            <text className=" text-xl cursor-pointer" onClick={handleSec}>Add</text>
        </div>

        {
            security && <form onSubmit={handleCheck} className=" flex flex-row p-2 gap-2 w-4/5 mx-auto ">
                <input className=" border-2 w-5/5 pl-2  rounded py-1 " name="password" value={valid} onChange={(e)=>setValid(e.target.value)}/>
                <button className=" border-2 px-2 py-0.5 rounded">Check</button>
            </form>
        }
        
        


        

        <div className="  border-none p-2 w-5/5 md:w-4/5 mx-auto my-2 rounded  grid grid-flow-row grid-cols-2  md:grid-cols-4 md:grid-flow-row gap-2">
            {
                cate?.map((data, index)=>{
                    return(
                        <text key={index} className=" border-none bg-red-500 text-center p-1 cursor-pointer rounded text-white" onClick={()=>handleChangeCate(data.name)}>{data.name}</text>
                    )
                })
            }

        </div>


        {
            EditW && <form onSubmit={handleUpdateItemDetail} className=" mx-auto flex flex-col gap-2 rounded w-4/5 border-2 p-4">
                <text className=" text-end px-2 cursor-pointer" onClick={handleEdit}>x</text>
                <text className=" text-center bg-red-500 py-1.5 text-white rounded">Update Item Detail</text>
                <input placeholder=" Enter update name" className=" border-2 py-1 rounded pl-2" name="name" value={updateItem.name} onChange={handleupdateItem}/>
                <input placeholder=" Enter update quantity" className=" border-2 py-1 rounded pl-2" name="quantity" value={updateItem.quantity} onChange={handleupdateItem}/>
                <input placeholder=" Enter update mrp" className=" border-2 py-1 rounded pl-2" name="mrp" value={updateItem.mrp} onChange={handleupdateItem}/>
                <input placeholder=" Enter update price" className=" border-2 py-1 rounded pl-2" name="price" value={updateItem.price} onChange={handleupdateItem}/>
                <button className=" border-none text-white rounded py-1 bg-red-500 ">Update</button>
            </form>
        }
        <text className=" w-11/12 md:w-4/5 flex flex-row mx-auto px-3">{`Result for ${CategoryS} category `}</text>
        <div className=" flex flex-row border-none sm:border-2 border-red-500  w-5/5 md:w-4/5 mx-auto my-4 gap-1 p-2 rounded ">
            <div className=" border-none  w-1/5 flex flex-col   rounded bg-red-500 p-2">

                {
                    Type?.filter((data)=>CategoryS == "All" ? data : data.category == CategoryS)
                    .map((data, index)=>{
                        return(
                            <text key={index} className=" text-white cursor-pointer p-1 hover:rounded hover:bg-white hover:text-red-500" onClick={()=>handleSearchType(data.name)}>{data.name}</text>
                        )
                    })
                }


            </div>
            
            <div className=" grid grid-flow-row sm:grid-cols-3  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-4/5 border-2 text-white rounded gap-2 p-2">
                {
                    data?.filter((data)=>CategoryS === "All" ? data : data.category === CategoryS)
                    .filter((data)=>TypeS === "All" ? data : data.type === TypeS)
                    .map((data, index)=>{
                        return(
                            <div key={index} className={`${open ? 'h-[160px]': 'h-[120px]  '} ${open ? 'p-1': 'p-2  '} flex flex-col   p-2 w-5/5 rounded bg-red-500`}>
                                <text>{data.name}</text>
                                <text className=" text-sm">{`Qty. ${data.quantity}`}</text>
                                {
                                    data.mrp > data.price ? <p className="">&#x20B9;<text className="  pr-1 line-through">{data.mrp}</text>{data.price}</p> : <p className="">&#x20B9;<text className="">{data.mrp}</text></p>
                                }
                                {
                                    open && <div className=" flex flex-row justify-between  w-5/5 mt-1.5">
                                                <button className=" border-2 py-0.5 rounded px-1 md:px-2"onClick={()=>handleEdit(data.id, data.name, data.quantity, data.mrp, data.price)}>Edit</button>
                                                <button className=" border-2 py-0.5 rounded px-1 md:px-2" onClick={()=>handleDelete(data.id)}>Delete</button>
                                            </div>
                                }

                                
                            </div>
                        )
                    })
                }
            
            
            
            </div>

        </div>
        

        {
            open && (
                <form onSubmit={handleAddItem} className=" w-4/5 border-2 p-2 flex flex-col mx-auto gap-2 rounded">
                    <text className=" text-center py-4 bg-red-500 rounded text-white"> Item Adding Page</text>
                    <input placeholder=" Enter Item name" className=" w-full pl-2 py-1 border-2 rounded" name="name" value={item.name} onChange={handleItem} />
                    <input placeholder=" Enter Item Quanity" className=" w-full pl-2 py-1 border-2 rounded" name="quantity" value={item.quantity} onChange={handleItem}/>
                    <input placeholder=" Enter Item Price" className=" w-full pl-2 py-1 border-2 rounded" name=" price" value={item.price} onChange={handleItem}/>
                    <input placeholder=" Enter Item MRP" className=" w-full pl-2 py-1 border-2 rounded" name="mrp" value={item.mrp} onChange={handleItem}/>
                    
                    <select className=" border-2 py-1 rounded" name="category" value={item.category} onChange={handleItem} >
                        {
                            cate?.map((data, index)=>{
                                return(
                                    <option >{data.name}</option>
                                )
                            })
                        }
                    </select>

                    <select className=" border-2 py-1 rounded" name="type" value={item.type} onChange={handleItem} >
                        {
                            Type?.filter((data)=> item.category == false ? data : data.category == item.category)
                            .map((data, index)=>{
                                return(
                                    <option >{data.name}</option>
                                )
                            })
                        }
                    </select>
                    
                    <button className="bg-red-500 py-2 rounded text-white">Add Item</button>

                </form>
            )
        }

        {
            open  && (
                <form onSubmit={handleAddType} className=" w-4/5 border-2 p-2 flex flex-col mx-auto gap-2 my-2 rounded">
                    <text className=" text-center py-4 bg-red-500 rounded text-white"> Adding Item Type </text>
                    <input placeholder=" Enter Item name" className=" w-full pl-2 py-1 border-2 rounded" name="name"  value={AddType.name} onChange={handleType} />
                    <select className=" border-2 py-1 rounded" name="category" value={AddType.category} onChange={handleType} >
                        {
                            cate?.map((data, index)=>{
                                return(
                                    <option >{data.name}</option>
                                )
                            })
                        }
                    </select>
                    
                    <button className="bg-red-500 py-2 rounded text-white">Add Item</button>

                </form>
            )
        }




        {
            open  && (
                <form onSubmit={handleAddCategory} className=" w-4/5 border-2 p-2 flex flex-col mx-auto gap-2 rounded my-2">
                    <text className=" text-center py-4 bg-red-500 rounded text-white">Adding Category</text>
                    <input placeholder=" Enter Item name" className=" w-full pl-2 py-1 border-2 rounded" name="name"  value={AddCate.name} onChange={handleCategory} />
                    <button className="bg-red-500 py-2 rounded text-white">Add Item</button>

                </form>
            )
        }





        
        </>
    )
}