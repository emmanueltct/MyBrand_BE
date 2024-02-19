export interface NewBlog{
    title:string,
    image:string,
    blogIntro:string,
    content:string,
}

export interface User{
    names:string
    email:string
}

export interface Client{
    client_info:User &{location:string}
    client_budget:string
    client_message:string

}

export interface Comment{
    user:User & {message:string}

}
