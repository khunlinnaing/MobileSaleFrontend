import { useState, useEffect } from "react";
function MyComponent(value, url) {
    const [values, setValue] =useState({})

    useEffect(() => {
        const apiUrl = url+value;
        fetch(apiUrl, {headers: {
            'token': 'token '+localStorage.getItem('token'),
        }})
            .then(response => response.json())
            .then(data => {
                setValue(data);
            })
            .catch(error => {
                setValue({status: 0, info: error.message})
            });
    }, []);

    return values;
}
export default MyComponent;