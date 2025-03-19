import React, { useEffect, useState } from "react";
import  BookDataService  from "./Controller/service"
import { updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";




export const Home = ()=>{

    //const [book, setBook] = useState({})
    const [flag, setFlag] = useState(true);
    const [change, setChange] = useState(1)
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Available");
    const [id, setID] = useState("")
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [books, setBooks] = useState([])
    const [show, setShow] = useState(false)
    const navigate = useNavigate()




    useEffect(()=>{
        getBooks()
    },[change])
 
    

    

  
   

    

    const getBooks = async()=>{
        const data = await BookDataService.getAllBook()
        console.log(data.docs)
        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(books)
    }

    const handleAdd = async(e)=>{
        e.preventDefault()
        setChange(change=>change+1)
        
        setMessage("");
        if (title === "" || author === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }

        const newBook = {
            title ,
            author,
            status,
          };

        try {
            await BookDataService.addBooks(newBook)
            setTitle("")
            setAuthor("")   
            setMessage({ error: false, msg: "New Book added successfully!" }); 
        }
        catch (err) {
            setMessage({ error: true, msg: err.message });
        
        }

        
        

    }



    
    const deleteHandler = async(index)=>{
        await BookDataService.deleteBook(index)
        setChange(change=>change+1)
        
    }
    


    const handleupdate = async(e)=>{
        e.preventDefault()
        try{
        const new1 = {
            title ,
            author,
            status,
          };

        await BookDataService.updateBook(id, new1 );
        setChange(change=>change+1)
        setShow(false)
        setTitle("")
        setAuthor("")

        }
        catch (err) {
        setMessage({ error: true, msg: err.message }); 
        }
      }
    

    const editHandler = async (id, name,author) => {
        setMessage("");
        setID(id)
        setAuthor(author)
        setTitle(name)
        console.log(id)
        setShow(true)
    }
   

    return(
        <div>
            {
                message.error && (
                    <text className=" flex flex-row w-4/5 mx-auto py-2 border-2 border-blue-500 rounded text-center my-4 justify-centerz">{message.msg}</text>
                )
            }

                    <form onSubmit={show ? handleupdate : handleAdd}  className=" flex flex-col mx-auto w-2/5 border-2 border-blue-400 py-4 px-2 gap-y-4 mt-10 rounded">
                        <input  placeholder=" Enter book Title" className=" rounded border-2 border-gray-400 py-2 px-2" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                        <input  placeholder=" Enter book Author" className=" rounded border-2 border-gray-400 py-2 px-2" name=" author" value={author} onChange={(e)=>setAuthor(e.target.value)}/>
                        <button  className=" px-2 py-2 bg-blue-500 border-none text-white rounded cursor-pointer" >{show ? "Update Book":"Add Book"}</button>
                    </form> 

            

           
            <div className=" mx-auto my-10 border-2 w-4/5 rounded p-2">
                <button className=" rounded px-2 py-1 text-white bg-red-500 " onClick={()=>navigate("/Profile")}> Profile</button>

            </div>
            <div className="  w-4/5 flex flex-col gap-y-2 mx-auto rounded my-10">
            
            {
                books.map((doc, index)=>{
                    return(

                        <div key={index} className=" rounded w-4/5 flex flex-row justify-between px-4 py-2 border-2 border-blue-500 mx-auto  text-black">
                            <text>{doc.title}</text>
                            <text>{doc.author}</text>
                            <text>{doc.status}</text>
                            <div className=" flex flex-row gap-x-4 ">
                                <button className=" bg-blue-500 text-white px-4 py-1.5 rounded " onClick={(e) => editHandler(doc.id, doc.title, doc.author,)}>Edit</button> 
                                <button className=" bg-blue-500 text-white px-4 py-1.5 rounded  " onClick={(e)=>deleteHandler(doc.id)}>Delete</button>                            
                            </div>
                        </div>
                    )
                })
            }
            </div>


        </div>

    )
}