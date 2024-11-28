import yup from 'yup'

export const sendLocalizationPropsSchema = yup.object({ 
    customer_id: yup.string().uuid().required(), 
    origin: yup.string().required(),
    destination: yup.string().required()

})