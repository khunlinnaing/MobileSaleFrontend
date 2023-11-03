function PasswordValidation(values) {
    let passerrors={};
    if (!values.pass) {
        passerrors.pass='Please Enter your Password'
    } else if ((values.pass).length < 8) {
        passerrors.pass='Please Enter your password at least 8 charactor.'
    }
    if (!values.confirmpass) {
        passerrors.confirmpass='Please Enter your confirm Password'
    } else if (values.pass !== values.confirmpass) {
        passerrors.confirmpass='Password and Confirm Password are not match.'
    } 
    return passerrors;
}
export default PasswordValidation;