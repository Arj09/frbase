import { db } from "../firebae-config"
import { collection, addDoc, updateDoc, deleteDoc, getDoc, getDocs , doc }  from "firebase/firestore"




const CategoryCollectionRef = collection(db, "category")


class CategoryDataService  {
    
    addCategory = (newCategory)=>{
        return addDoc(CategoryCollectionRef, newCategory)

    }
    updateCategory = (id, updateCategory) =>{
        const CategoryDoc = doc(db, "category", id)
        return updateDoc(CategoryDoc, updateCategory) 
    }

    deleteCategory = (id)=>{
        const CategoryDoc = doc(db, "category", id)
        return deleteDoc(CategoryDoc)

    }

    getAllCategory = ()=>{
        return getDocs(CategoryCollectionRef)

    }
    getCategory = (id) =>{
        const CategoryDoc = doc(db, "category", id)
        return getDoc(CategoryDoc)
    }

} 



export default new CategoryDataService();