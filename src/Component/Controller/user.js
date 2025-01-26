import { db } from "../firebae-config"
import { collection, addDoc, updateDoc, deleteDoc, getDoc, getDocs , doc }  from "firebase/firestore"




const userCollectionRef = collection(db, "user")


class UserDataService  {
    
    addUsers = (newUser)=>{
        return addDoc(userCollectionRef, newUser)

    }
    updateUser = (id, updateUser) =>{
        const userDoc = doc(db, "user", id)
        return updateDoc(userDoc, updateUser) 
    }

    deleteUser = (id)=>{
        const userDoc = doc(db, "user", id)
        return deleteDoc(userDoc)

    }

    getAllUser = ()=>{
        return getDocs(userCollectionRef)

    }
    getUser = (id) =>{
        const userDoc = doc(db, "user", id)
        return getDoc(userDoc)
    }

} 



export default new UserDataService();