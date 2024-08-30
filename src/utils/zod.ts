import {z} from 'zod'


export const signUpData=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6,"password must be at least 6 characters long")
})

export const loginData=z.object({
    email:z.string().email(),
    password:z.string().min(6,"password must be at least 6 characters long")
})
