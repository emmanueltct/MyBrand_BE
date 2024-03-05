import {test,it,describe,expect,beforeAll,afterAll,beforeEach} from '@jest/globals'
import  supertest from 'supertest'
import {Request,Response} from 'express'
import mongoose from 'mongoose'
import app from "../src/index"
import Users from '../src/models/userAuth'
import Blog from '../src/models/blog'
import dotenv from 'dotenv'

dotenv.config()
const DB_URL=process.env.testDB


beforeAll(async()=>{
    await mongoose.connect(DB_URL as string)

   //await mongoose.connect("mongodb://127.0.0.1:27017/Andela_coh29")
},100000 )

afterAll(async()=>{
    await mongoose.connection.close()
})

describe('Testing invalid endpoints',()=>{
    it('All unexisting route', async()=>{
        const response=await supertest(app).get('/api/*')
        expect(response.statusCode).toBe(404)
    })
})

let notAdminToken=""
let blogid=""
let isAdminToken:string=''
let userId=''
describe("Test for authentication & authorization",()=>{
    let userEmail:string=''
    describe('user signup',()=>{
        
       
        it("POST users/auth/signup: user is created successful", async()=>{
            
            const user=await Users.find()
            if(user.length<1){
                const response=await supertest(app).post('/api/users/auth/signup').
                send({
                names:"MUNEZERO Emmanuel",
                email:"emmanuelmunezero@gmail.com",
                password:"test1234h",
             })

             const updateUser= await Users.findOne({ email: "emmanuelmunezero@gmail.com"})
             if(updateUser){
                updateUser.userType='admin' 
                updateUser.save()
             }
            }

            const userInput:{
                names:string,
                email:string,
                password:string,
            }={
                names:'',
                email:"",
                password:""
            }
            let r = (Math.random() + 1).toString(36).substring(5);
            userEmail=`user${r}@gmail.com`;
            const response=await supertest(app).post('/api/users/auth/signup')
            .send({
                "names":`User test`,
                "email":userEmail,
                "password":"test1234h"
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toContain('Signup successful')
            expect(response.body).toHaveProperty('token')
            //userEmail=response.body.user.email as string
            
        })
    

        it("POST users/auth/signup:check if user email exist ", async()=>{
            const userInput:{
                names:string,
                email:string,
                password:string,
            }={
                names:'',
                email:"",
                password:""
            }
            const response=await supertest(app).post('/api/users/auth/signup')
            .send({
                "names":"User usertest",
                "email":"emmanuelmunezero@gmail.com",
                "password":"test1234h"
            })
            expect(response.statusCode).toBe(409)
            expect(response.body.error).toContain('the user email is exist')
        })

        it("POST users/auth/signup:check input validation ", async()=>{
            const userInput:{
                names:string,
                email:string,
                password:string,
            }={
                names:'',
                email:"",
                password:""
            }
            let r = (Math.random() + 1).toString(36).substring(7);
            const response=await supertest(app).post('/api/users/auth/signup')
            .send({
                "names":"User user2",
                "email":"",
                "password":"test1234h"
            })
            expect(response.statusCode).toBe(403)
        
        })

    })




    // user login test start here


    describe('POST api/users/auth/login: user login tests ',()=>{
        
        it("User login as an Admin and have all privelledges",async()=>{
            const response=await supertest(app).post('/api/users/auth/login')
            .send({
                email:"emmanuelmunezero@gmail.com",
                password:"test1234h"
            })
           
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('token')
            isAdminToken=response.body.token
         
            
        })

        it("User login authentication to normal user",async()=>{
            const response=await supertest(app).post('/api/users/auth/login')
            .send({
                email:'usergdhz03p@gmail.com',
                password:"test1234h",
            })
           
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('token')
            notAdminToken=response.body.token
           
          
            
        })


        it("POST api/user/login:missing creditial when email is not provided",async()=>{
            const response=await supertest(app).post('/api/users/auth/login')
            .send({
                email:"",
                password:"test1234h"
            })
            expect(response.statusCode).toBe(403)
            
        })

        it("POST api/user/login:user with invalid email format",async()=>{
            const response=await supertest(app).post('/api/users/auth/login')
            .send({
                email:"emmanulgmail.com",
                password:"test1234h"
            })
            expect(response.statusCode).toBe(403)
            
        })

        it("POST api/user/login:user not found",async()=>{
            const response=await supertest(app).post('/api/users/auth/login')
            .send({
                email:"emmanulyyyyyyyyyyyyyyyyyyy@gmail.com",
                password:"test1234h"
            })
            expect(response.statusCode).toBe(404)
            
        })

        it("POST api/user/login:wrong password provided",async()=>{
            const response=await supertest(app).post('/api/users/auth/login')
            .send({
                email:"emmanuelmunezero@gmail.com",
                password:"test1234huu"
            })
           
            expect(response.statusCode).toBe(404)
            expect(response.body.message).toContain("Wrong Password")
            
        })
    })







// tests for blog start here
    let blogTitle:string='';
    let commentId='';
    describe("test for blog controller, middleware and etc...",()=>{

    let blogs={  title: "this blog is final hh 2324",
                 blogIntro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                 content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}



        it('Unauthorised access for user who post a blog without a login',async()=>{
            const response=await supertest(app).post('/api/blogs')
            .send(blogs)
            expect(response.statusCode).toBe(401)
            expect(response.body.message).toContain("Unauthenticated user detected. Please login to continue")
        })

    
        it('POST api/blog : Posting new blog for to authenticated user but not admin',async()=>{
            let r = (Math.random() + 1).toString(36).substring(5);
            blogs.title=blogs.title+""+r
           const blog= await Blog.create(blogs)
           const response=await supertest(app).post('/api/blogs')
           .send({blog})
           .set('Authorization',notAdminToken)
            expect(response.statusCode).toBe(401)
            expect(response.body.error).toContain("you are not allowed to perform this operation")
            
           })
          


             it('blog post with bad format of profile ', async()=> {
                const dotPathfile =`${__dirname}/../blog_profile/kivu.jpg` ;
                const response=await supertest(app).post('/api/blogs')
                    .set('Authorization',isAdminToken)
                    .set('contentType', 'application/octet-stream')
                    .field('title', 'Le Lorem Ipsum est simplement')
                    .field('blogIntro', 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. ')
                    .field('content', "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.l n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. ")
                    .expect(400)
           
                 });
    
          
             it('blog post with successfull', async()=> {
                const dotPathfile =`${__dirname}/../blog_profile/test/kivu.jpg` ;
                let r = (Math.random() + 1).toString(36).substring(5);
                const response=await supertest(app).post('/api/blogs')
                  
                    .set('Authorization',isAdminToken)
                    .set('contentType', 'application/octet-stream')
                    .field('title', `Le Lorem Ipsum est test ${r}`)
                    .field('blogIntro', 'Le Lorem Ipsum est simplement du faux texte employé')
                    .field('content', "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.l n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. ")
                    .attach('image',dotPathfile)
                    .expect(200)
                    blogid=response.body.data._id
                    blogTitle=response.body.data.title
                    
                 });


                  
             it('blog post with existing title', async()=> {
              
                const dotPathfile =`${__dirname}/../blog_profile/test/kivu.jpg` ;
                let r = (Math.random() + 1).toString(36).substring(5);
                const response=await supertest(app).post('/api/blogs')
                  
                    .set('Authorization',isAdminToken)
                    .set('contentType', 'application/octet-stream')
                    .field('title', `${blogTitle}`)
                    .field('blogIntro', 'Le Lorem Ipsum est simplement du faux texte employé')
                    .field('content', "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.l n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. ")
                    .attach('image',dotPathfile)
                    .expect(409)
                   
                    
                 });



                 it('blog post with missing some input data', async()=> {
                    const dotPathfile =`${__dirname}/../blog_profile/test/kivu.jpg` ;
                    const response=await supertest(app).post('/api/blogs')
                        .set('Authorization',isAdminToken)
                        .set('contentType', 'application/octet-stream')
                        .field('title', '')
                        .field('blogIntro', 'Le Lorem Ipsum est simplement du faux texte employé')
                        .field('content', "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.l n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. ")
                        .attach('image',dotPathfile)
                        .expect(403)
               
                     });
            
            
            it("GET api/blogs: getting all blog list ", async()=>{
                const response=await supertest(app).get('/api/blogs');
                expect(response.statusCode).toBe(200)
                blogid=response.body.data[0]._id
                blogTitle=response.body.data[0].title
            
            })



        it("GET api/blogs/:id: passing a wrong id for blog? (Bad request) ", async()=>{
            const id='65d6ed020e5b0ea2307c59c3hhfhhfhfhhf'
            const response=await supertest(app).get(`/api/blogs/${id}`);
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toContain('Invalid data detected, you are passing a wrong id on blog. please try again!')
          
        })

        it("GET api/blogs/:id: is existing blog? (Not found) ", async()=>{
            const id='65d6ed020e5b0ea2307c59c3'
            const response=await supertest(app).get(`/api/blogs/${id}`);
            expect(response.statusCode).toBe(404)
          
        })


        it("GET api/blogs/:id: getting a single blog ", async()=>{
            const response=await supertest(app).get(`/api/blogs/${blogid}`);
            expect(response.statusCode).toBe(200)
        })


        it("PATCH api/blogs/:id:Update a single blog",async()=>{
            const response=await supertest(app).patch(`/api/blogs/${blogid}`)
            .send(blogs)
            .set('Authorization',isAdminToken)
            expect(response.statusCode).toBe(200)
        })

        
        
        it("POST api/blogs/:id/likes:Creating a likes to a blog",async()=>{
        
            const response=await supertest(app).post(`/api/blogs/${blogid}/likes`)
            .set('Authorization',isAdminToken)
            expect(response.statusCode).toBe(200)
        })

        it("POST api/blogs/:id/likes:Creating a likes to a blog",async()=>{
            const response=await supertest(app).post(`/api/blogs/${blogid}/likes`)
            .set('Authorization',isAdminToken)
            expect(response.statusCode).toBe(200)
        })


    it("GET api/blogs/:id/likes: Total like and dislike of blog",async()=>{
                const response=await supertest(app).get(`/api/blogs/${blogid}/likes`)
                .set('Authorization',isAdminToken)
                expect(response.statusCode).toBe(200)
                expect(response.body).toHaveProperty("Total_like")
            })

// blog comment test start here -------------------------------

            it("POST api/blogs/:id/comment:comment without Authentication",async()=>{
                const response=await supertest(app).post(`/api/blogs/${blogid}/comments`)
                .send({message:"Hey I loged in as a normal user and I am commenting on this blog"})
                expect(response.statusCode).toBe(401)
            })
    
            it("POST api/blogs/:id/comment:send invalid comments(not validated)",async()=>{
                const response=await supertest(app).post(`/api/blogs/${blogid}/comments`)
                .send({message:"hey I am"})
                .set('Authorization',isAdminToken)
                expect(response.statusCode).toBe(403)
                expect(response.body.error).toContain('message length must be at least 20 characters long')
            })
    
            it("POST api/blogs/:id/comment:Creating a comment to a blog",async()=>{
                const response=await supertest(app).post(`/api/blogs/${blogid}/comments`)
                .send({message:"Hey I loged in as a normal user and I am commenting on this blog"})
                .set('Authorization',isAdminToken)
    
                expect(response.statusCode).toBe(200)
            })
    
       

        it("GET api/blogs/:id/comments: getting get a all comment for a blog ", async()=>{
            const response=await supertest(app).get(`/api/blogs/${blogid}/comments`);
            expect(response.statusCode).toBe(200)
            if(response.body.data.length>0){
               commentId=response.body.data[0]._id
        
            }
            
        })

        it("GET api/comments/:id: get unexisting single comment",async()=>{
            let id='65d6fba6f13e3670ed1c7f19'
            const response=await supertest(app).get(`/api/comments/${id}`)
            expect(response.statusCode).toBe(404)
           expect(response.body.error).toContain("Comment doesn't exist!")
        
        })

        it("GET api/comments/:id: get unexisting single comment with invalid request",async()=>{
            let id='65d6ed020e5b0ea2307c59c377hghghhgh'
            const response=await supertest(app).get(`/api/comments/${id}`)
            expect(response.statusCode).toBe(400)
           expect(response.body.error).toContain("This comment is inavlid and try again")
           
        })

     
        it("GET api/comments/:id: get a single comment",async()=>{
            const id=commentId
            const response=await supertest(app).get(`/api/comments/${id}`)
            expect(response.statusCode).toBe(200)
            
        })

     
            it("DELETE api/comments/:id: delete a specific comment when you are not authenticated",async()=>{
                const id=commentId
                const response=await supertest(app).delete(`/api/comments/${id}`)
                expect(response.statusCode).toBe(401)
                
            })

            
    
            it("DELETE api/comments/:id: delete unexisting comment",async()=>{
                const id='65d6fba6f13e3670ed1c7f19'
                const response=await supertest(app).delete(`/api/comments/${id}`)
                .send({message:"Hey I loged in as a normal user and I am commenting on this blog"})
                .set('Authorization',isAdminToken)
    
                expect(response.statusCode).toBe(404)
            })

            it("DELETE api/comments/:id: bad request on deleting comment",async()=>{
                const id='65d6ed020e5b0ea2307c59c377ghhhhrhhrghhhhf'
                const response=await supertest(app).delete(`/api/comments/${id}`)
                .send({message:"Hey I loged in as a normal user and I am commenting on this blog"})
                .set('Authorization',isAdminToken)
    
                expect(response.statusCode).toBe(400)
                expect(response.body.error).toContain("This comment is inavlid and try again")
            })


            it("DELETE api/comments/:id: delete a specific comment ",async()=>{
                const id=commentId
                const response=await supertest(app).delete(`/api/comments/${id}`)
                .set('Authorization',isAdminToken)
                expect(response.statusCode).toBe(204)
                
                
            })
        


        it("DELETE api/blogs/:id: deleting a blog",async()=>{
            const response=await supertest(app).delete(`/api/blogs/${blogid}`)
            .set('Authorization',isAdminToken)

            expect(response.statusCode).toBe(204)
        })

  
    })

    describe('test client querrie',()=>{
        let QuerryId=''
        it("POST api/querries: test if user can create a querry",async()=>{
            const response=await supertest(app).post('/api/querries')
            .send({        
                    "names":"Emmanuel Munezero",
                    "email":"emmanuel@gmail.com",
                    "location":"kigali, KG st 12",
                    "budget":"100$",
                    "subject":"hey Ipsum is simply dummy text ",
                    "message":"Lorem Ipsum is simply dummy text ofthe printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                 })
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toContain("Querries is successfully created")
        })


        it("POST /api/querries: if querry is validated",async()=>{
            const response=await supertest(app).post('/api/querries')
            .send(
                {
                "names":"Emmanuel Munezero",
                "email":"emmanuel@gmail.com",
                "location":"kigali, KG st 12",
                "budget":"",
                "message":"Lorem Ipsum is simply dummy text ofthe printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                 })
            expect(response.statusCode).toBe(403)
        })

        it("GET /api/querries: reading a querry when you are not Authenticated",async()=>{
            const response=await supertest(app).get('/api/querries')
          
            expect(response.statusCode).toBe(401)
        })

        it("GET /api/querries: reading a querry when you are Authenticated",async()=>{
            const response=await supertest(app).get('/api/querries')
            .set('Authorization',isAdminToken)
            expect(response.statusCode).toBe(200)
            QuerryId=response.body.data[0]._id
        })

        it("GET /api/querries: reading unexisting querry when you are Authenticated",async()=>{
            const id='65d6ed020e5b0ea2307c59c377'
            const response=await supertest(app).get(`/api/querries/${id}`)
            .set('Authorization',isAdminToken)
            expect(response.statusCode).toBe(404)
           
        })


        it("GET /api/querries: deleting a querry when you are Authenticated",async()=>{
            
            const response=await supertest(app).delete(`/api/querries/${QuerryId}`)
            expect(response.statusCode).toBe(401)
            
        })

        it("GET /api/querries: try to delete a querry which not exist",async()=>{
            const id='65d6ed020e5b0ea2307c59c377'
            const response=await supertest(app).delete(`/api/querries/${id}`)
            .set('Authorization',isAdminToken)
            expect(response.statusCode).toBe(404)
            
        })
        it("GET /api/querries: deleting a querry when you are Authenticated",async()=>{
          
            const response=await supertest(app).delete(`/api/querries/${QuerryId}`)
            .set('Authorization',isAdminToken)
            expect(response.statusCode).toBe(204)
            
        })
    })

})




/*
function addingTwo(a:number,b:number):number{
    return a+b
}
test("test function of adding two number",()=>{
   
})
*/ 