import React, { createContext,useContext,useState,useEffect,useMemo } from "react";
import { ApiEndPoint } from "./service/ApiEndPoint";
import API from '../components/service/ApiService';



const ApiKeyContext = createContext();



export function useApiKey(){
    return useContext(ApiKeyContext)
}



 export function ApiKeyProvider({children}) {
const[apiKey,setApiKey]=useState("");
const getSecretValue = localStorage.getItem('secretKey');


useEffect(() => {
    getApiKey();
}, []);

    const getApiKey = () => {

        const headers = {
            "accept": "application/json",
            "secertkey": getSecretValue,
           
        }
        API.get(ApiEndPoint.GetApiKey, {
            headers: headers
        }).then((response) => {
         
           console.log("response  getApi===>",response.data.data);
           setApiKey(response.data.data.apiKey)
         
        })
            .catch((error) => {
                console.log('Error fetching API key:', error);
     
            });
    }
    const contextValue = useMemo(() => {
    return  {
        apiKey,
        getApiKey,
    };
    // const contextValue = useMemo(() => {
    //     return {
    //         apiKey,
    //         getApiKey,
    //     };
    // }, [apiKey]);

});
 return(
        <ApiKeyContext.Provider value={contextValue}>
            {children}
        
        </ApiKeyContext.Provider>
    )


 }
