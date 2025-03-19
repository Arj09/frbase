import { db } from "../firebae-config"
import { collection, addDoc, updateDoc, deleteDoc, getDoc, getDocs , doc }  from "firebase/firestore"




const TypeCollectionRef = collection(db, "Type")


class TypeDataService  {
    
    addType = (newType)=>{
        return addDoc(TypeCollectionRef, newType)

    }
    updateType = (id, updateType) =>{
        const TypeDoc = doc(db, "Type", id)
        return updateDoc(TypeDoc, updateType) 
    }

    deleteType = (id)=>{
        const TypeDoc = doc(db, "Type", id)
        return deleteDoc(TypeDoc)

    }

    getAllType = ()=>{
        return getDocs(TypeCollectionRef)

    }
    getType = (id) =>{
        const TypeDoc = doc(db, "Type", id)
        return getDoc(TypeDoc)
    }

} 



export default new TypeDataService();