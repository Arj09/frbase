import { db } from "../Component/firebae-config"
import { collection, addDoc, updateDoc, deleteDoc, getDoc, getDocs , doc }  from "firebase/firestore"




const bookCollectionRef = collection(db, "item")


class BookDataService  {
    
    addBooks = (newBook)=>{
        return addDoc(bookCollectionRef, newBook)

    }
    updateBook = (id, updateBook) =>{
        const bookDoc = doc(db, "item", id)
        return updateDoc(bookDoc, updateBook) 
    }

    deleteBook = (id)=>{
        const bookDoc = doc(db, "item", id)
        return deleteDoc(bookDoc)

    }

    getAllBook = ()=>{
        return getDocs(bookCollectionRef)

    }
    getBook = (id) =>{
        const bookDoc = doc(db, "item", id)
        return getDoc(bookDoc)
    }

} 



export default new BookDataService();