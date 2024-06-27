import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { json } from 'express';


export const signup = async (req, res, next) => {
   const { username, email, password } = req.body;
   // const hashedPassword = hashSync(password, 10)
   const newUser = new User({ username, email, password: password });

   try {
      await newUser.save()
      res.status(201).json("user created successfully");
   }
   catch (error) {
      next(error);
   }

};

const jwtkey ="1234567sdadasdad";
export const signin = async (req, res, next) => {
   const email = req.body.email;
   const password2 = req.body.password; 
   console.log(req.body);


   

   try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, "User not found !"));
      const validPassword = password2 == validUser.password;
      // compareSync(password2, validUser.password)
      if (!validPassword) return next(errorHandler(401, 'Invalid password !'));
      const token = jwt.sign({ id: validUser._id }, jwtkey);
      console.log("bu bizim keyjwt"+jwtkey)
      const { password: password, ...rest } = validUser._doc;
      res
         .cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
   } catch (error) {
      next(error);
   }
};

export const google = async (req, res, next) => {
       try {
         const user=await User.findOne({email: req.body.email})
         if (user) {
            const token =jwt.sign({id : user._id},jwtkey);
            const {password:pass,...rest}=user._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);
         }
         else{
            //  const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            //  const hashedPassword=hashSync(generatedPassword,10);
             const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4),
                email:req.body.email, password:req.body.email, avatar:req.body.photo});
                await newUser.save();
                const token =jwt.sign({id:newUser._id},jwtkey);
                const{password:pass, ...rest}=newUser._doc;
                res.cookie('access_token',token,{httpOnly: true}).status(200).json(rest);
         }
       } catch (error) {
         next(error);
       }
}

