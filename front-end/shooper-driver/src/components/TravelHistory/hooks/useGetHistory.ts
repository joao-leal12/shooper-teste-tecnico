import { useQuery } from "@tanstack/react-query"
import { client } from "../../../infra/http/axios-client"
import {  TravelProps } from "..";
import { useState } from "react";

export const useGetHistory = (customerId: string ) => {

  const [driverId, setDriverId] = useState<number | undefined>(undefined)


    const getHistory = async (customerId: string, driverId?: number):Promise<TravelProps[]> => {

      if(!customerId) return []
      console.log(driverId)
      const url = driverId
      ? `/ride/${customerId}?driverId=${driverId}`
      : `/ride/${JSON.parse(customerId)}`;


     const output = await  client.get(url)
      return output.data
    }

    const {data: historyData, isLoading, isError, error} = useQuery<TravelProps[]>({queryFn: () => getHistory(customerId, driverId), queryKey: [driverId, customerId], enabled: !!customerId, initialData: []} )



  return {historyData, isLoading, isError, error, setDriverId, driverId}
}
