import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = mongoose.Schema({ 
   name:{
    type: String,
    require: true,
    trim:true
   },
   password:{
    type: String,
    require: true,
    trim:true
   }
});

userSchema.pre('save',async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
});

userSchema.methods.checkPassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
    
}

const User = mongoose.model('User', userSchema);

export default User;