import {useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import  {useMutation} from '@tanstack/react-query'
import * as yup from 'yup'
import { client } from '../../../infra/http/axios-client';
import { sendLocalizationPropsSchema } from '../schemas/apis-schemas';
import {v4 as uuidv4} from 'uuid'
import {useNavigate} from 'react-router'
import { useDriverStore } from '../../../Services/store/drivers';
const schema = yup.object({ 
    
    name: yup.string().required('Nome é Obrigatório'), 
    origin: yup.string().required('Origem Obrigatório'), 
    destination: yup.string().required('Destino Obrigatório')
}).required(); 

export type FormData = yup.InferType<typeof schema>

type SendLocalizationProps = yup.InferType<typeof sendLocalizationPropsSchema>



export const useFormLocalization = () => {

    const navigate = useNavigate(); 

    const addDriver = useDriverStore(state => state.addDriver)
    const {control, register, handleSubmit,  formState: {errors}, reset} = useForm<FormData>({
        resolver: yupResolver(schema)
    }); 

    
    const saveCustomerId = (customerId: string) => { 

        sessionStorage.setItem('customerId', JSON.stringify(customerId))

    }

    const mutation = useMutation({
        mutationFn: (formData: SendLocalizationProps) => {
            return client.post('/ride/estimate', formData).then((data) => {
                const response = data.data 
                saveCustomerId(formData.customer_id)
                addDriver({...response,originName: formData.origin, destinationName: formData.destination})

            })
        }
    });




    const onSubmitField = async (data:FormData) => {
        const customerId = uuidv4(); 

    
       await  mutation.mutateAsync({ 
            customer_id: customerId, 
            origin: data.origin, 
            destination: data.destination
         })


        reset()
    
    }

    return{control, register,handleSubmit, Controller, errors, onSubmitField, mutation, navigate, reset}
}
