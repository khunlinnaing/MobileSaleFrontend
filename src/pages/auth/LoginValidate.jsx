function loginValidation(datas){
    let errors={};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if(!datas.email){
        errors.email="Please enter your email."
    }else if(!emailRegex.test(datas.email)){
        errors.email="Your email format is invalid.";
    }
    if(!datas.password){
        errors.password="Please enter your Passowrd."
    }else if(datas.password[0].length < 8){
        errors.password="Please Enter your password at least 8 characters.";
    }
    return errors
}

export default loginValidation;