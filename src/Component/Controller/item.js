import { db } from "../firebae-config"
import { collection, addDoc, updateDoc, deleteDoc, getDoc, getDocs , doc }  from "firebase/firestore"




const ItemCollectionRef = collection(db, "item")


class ItemDataService  {
    
    addItems = (newItem)=>{
        return addDoc(ItemCollectionRef, newItem)

    }
    updateItem = (id, updateItem) =>{
        const itemDoc = doc(db, "item", id)
        return updateDoc(itemDoc, updateItem) 
    }

    deleteItem = (id)=>{
        const itemDoc = doc(db, "item", id)
        return deleteDoc(itemDoc)

    }

    getAllItem = ()=>{
        return getDocs(ItemCollectionRef)

    }
    getItem = (id) =>{
        const itemDoc = doc(db, "item", id)
        return getDoc(itemDoc)
    }

} 



export default new ItemDataService();