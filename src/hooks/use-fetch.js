import { useEffect, useState } from "react";

const useFetch= (configration)=>{

    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data,setData] = useState(null);
    useEffect(()=>{
        console.log('called');
        const sendRequest = async ()=>{
            setIsLoading(true);
            setError(null);
    
            try {
                const response = await fetch(configration.url,{
                    method:configration.method?configration.method:'GET',
                    headers:configration.headers?configration.headers:{},
                    body:configration.body?configration.body:null
                });
                if(!response.ok){
                    console.log(response);
                    throw Error ('Request Failed');
                }
    
                const res = await response.json();
                setData(res);
                
            } catch (error) {
                setError(error.message || 'Something went wrong ')
            }
            setIsLoading(false);  
          
        };

        sendRequest()
    },[])
  

    return {
        isLoading,
        error,
        data
    }
};


export default useFetch;