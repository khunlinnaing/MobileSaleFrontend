function calculateAge(age){
    const currentDate= new Date();
    const diffTime = currentDate - new Date(age);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const year=Math.floor(totalDays / 365.25)
    return year;
}
export default calculateAge;