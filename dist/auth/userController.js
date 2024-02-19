"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.register = exports.login = void 0;
const userAuth_1 = __importDefault(require("../models/userAuth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /*

    try {

        const user=await Users.findOne({email:req.body.email})
        if(!user){
            res.status(400),
            res.send({message:"User does not exist please check your email again"})
        }else{
            const passwordMatch=await bcrypt.compare(req.body.password,user.password)
            if(!passwordMatch){
                res.status(400)
                res.send({error:"Email or Password not match please try again"})
            }
            const token=createToken({userID:user.id})
            res.status(200)
            res.send({
                message:"User loged in successfuly",
                data:token
            })
         }
    } catch (error) {
        res.status(400)
        res.send({err:error});
    }
    */
    passport_1.default.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.');
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user._id, email: user.email, userType: user.userType };
                const token = jsonwebtoken_1.default.sign({ user: body }, 'TOP_SECRET');
                return res.json({ token });
            }));
        }
        catch (error) {
            return next(error);
        }
    }))(req, res, next);
});
exports.login = login;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    try {
        const user=await Users.findOne({email:req.body.email})
        if(user){
            res.status(400),
            res.send({message:"User with this email is already exist"})
        }else{
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(req.body.password,salt)

            const newUser=new Users({

                names:req.body.names,
                email:req.body.email,
                password:hashedPassword
            })
            
          const savedUser= await newUser.save()
          if(!savedUser){
                res.status(201)
                res.send({error:"Something went wrong please try again"});
            };
           
            const token=createToken({userID:savedUser.id})
            res.status(200)
            res.send({message:"New user successfully created",
                      data:token
                    });

        }

    } catch (error:any) {
        res.status(400)
        res.send(error.message);
    }
    */
    passport_1.default.authenticate('signup', { session: false }),
        (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            res.json({
                message: 'Signup successful',
                user: req.user
            });
        });
});
exports.register = register;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userAuth_1.default.find();
        res.status(200);
        res.send(user);
    }
    catch (error) {
        res.status(400);
        res.send(error.message);
    }
});
exports.getAllUsers = getAllUsers;
