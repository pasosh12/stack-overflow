export type UserCredentials = {
    username: string,
    password: string
}

export type User = {
    id: string, //!!!
    username: string,
    role: string
}
export type UserResponse = {
    data: {
        id: string,
        username: string,
        role: string
    },
    message: string,
}