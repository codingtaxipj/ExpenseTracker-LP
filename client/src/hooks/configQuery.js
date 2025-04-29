 import {  } from "react"
  import { useQuery } from "@tanstack/react-query"
   import axios from "axios"
export const useQueryToFetch = () =>{

        const fetchData  = async () => await axios.get("http://localhost:8080/expense/get-data");      
           
        const {data,isLoading} = useQuery({
                queryKey : ['expense'],
                querryFn : fetchData,
            });      

        if (isLoading) return <div>loading...</div>
        console.log(data);
        
        if (!isLoading) return data ;
}

export const useQueryToUpdate = () =>{}