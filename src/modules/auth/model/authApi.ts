import {baseApi} from "../../../shared/api/base-api.ts";

type UserCredentials={username:string,password:string}

export const authApi= baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation<{id:number, username:string,role:string},UserCredentials>({
            query:(body)=>({
                url:'/api/auth/login',
                method:'POST',
                body
            })
        }),
        register:builder.mutation<{data:{id:number, username:string,role:string}},UserCredentials>({
            query:(body)=>({
            url:'/api/register',
                method:'POST',
                body
            })

        })

    })
})