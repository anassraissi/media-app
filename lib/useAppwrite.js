import { isLoading } from 'expo-font';
import React, { useEffect, useState } from 'react'

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchData=async()=>{
        setLoading(true)
            try {
                  const response=await fn();
                  setData(response);
            } catch (error) {
                      Alert.alert('Error',error.message)

            }
            finally{
              setLoading(false)
            }

          }
    useEffect(()=>{
         fetchData();
     },[])
     const refetch=()=>fetchData(); 
    // callback function when refresh page do just this function without use the hole component
     return {data,refetch,isLoading}
}

export default useAppwrite