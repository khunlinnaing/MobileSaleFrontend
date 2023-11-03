function SignUpValidate(datas){
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const currentDate= new Date();
    let singupError = {};
    if(!datas.firstname){
        singupError.firstname='Please Enter your First name'
    }
    if(!datas.lastname){
        singupError.lastname='Please Enter your Last Name'
    }
    if(!datas.email){
        singupError.email='Please Enter your Email.'
    }else if(!emailRegex.test(datas.email)){
        singupError.email='Your email format is invalid.'
    }
    if(!datas.phone){
        singupError.phone='Please Enter your Phone Number.'
    }else if((datas.phone).length < 10 || (datas.phone).length > 13){
        singupError.phone='Please your Phone number length 10 to 12'
    }
    if(datas.mobile){
        if(datas.phone === datas.mobile){
            singupError.mobile='Please enter phone number and mobile number are not match.'
        }
        else if((datas.mobile).length < 10 || (datas.mobile).length > 13){
            singupError.mobile='Please your Phone number length 10 to 12.'
        }
    }
    if(!datas.address){
        singupError.address='Please Enter your address.'
    }
    if(!datas.gender){
        singupError.gender='Please choose Genter at once.'
    }
    if(!datas.birthday){
        singupError.birthday='Please Enter your Birthday'
    }else{
        const diffTime = currentDate - new Date(datas.birthday);
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const year=Math.floor(totalDays / 365.25)
        if(year < 18){
            singupError.birthday='Please enter your age is at least 18 years old.'
        }
    }
    if(datas.file){
        singupError.file=datas.file
    }
    return singupError;
}
export default SignUpValidate