import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { toast } from 'react-toastify'

export default function ContactLandLord({userRef, listing}) {

    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState("")

    useEffect(()=> {
      async function getLandlord(){
        const docRef = doc(db, "users", userRef )
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            setLandlord(docSnap.data())
        }else{
            toast.error("Could not grt Landlord data")
        }
      }  
      getLandlord()
      console.log(landlord)
    },[userRef])

    function onChange(e){
       setMessage(e.target.value) 
    }

  return <>
        {landlord !== null && (
            <div className='flex flex-col w-full mt-5'>
                <p className='p-2 text-sm'>
                    Contact {landlord?.name} for the {listing?.name.toLowerCase()}</p>
                <div>
                    <textarea
                    className='w-full px-4 py-3 mt-2 text-lg text-gray-700 rounded border outline-none' 
                    name="message" 
                    id='message' 
                    rows="2" 
                    value={message}
                    onChange={onChange}>
                    </textarea>
                </div>
                <a href={`mailto:${landlord?.email}?Subject=${listing?.name}&body=${message}`}>
                   <button type="button" className='px-6 py-2 bg-bluecolor hover:bg-bluehover-color text-white rounded mt-2'>
                    Send Message
                    </button> 
                </a>
            </div>
            
        )}</>
  
}
