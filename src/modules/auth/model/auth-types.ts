export type UserCredentials = {
    username: string,
    password: string
}

export type User = {
    id: number,
    username: string,
    role: string
}
export type UserResponse = {
    data: {
        id: number,
        username: string,
        role: string
    },
    message: string,
}