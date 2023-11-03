function CategoryValidation(values, page) {
    let errors = {};
    let number = /^[0-9]*$/
    if (!values.name) {
        errors.name = `Please enter your ${page} name.`
    }
    if (page === 'products') {
        if (!values.type) {
            errors.type = `Please enter your ${page} Type.`
        } 
        if (!values.price) {
            errors.price = `Please enter your ${page} price.`
        } else if (!number.test(values.price)) {
            errors.price = `${page} price input only 0 to 9.`
        } else if (values.price === '0') {
            errors.price = `Your ${page} price first without start 0.`
        }
        if (!values.quantity) {
            errors.quantity = `Please enter your ${page} quantity.`
        } else if (!number.test(values.quantity)) {
            errors.quantity = `${page} quantity input only 0 to 9.`
        } else if (values.quantity === '0') {
            errors.quantity = `Your ${page} quantity first without start 0.`
        }

    } else if (page === 'category') {
        if (!values.type) {
            errors.type = `Please enter your ${page} Type.`
        } else if (!number.test(values.type)) {
            errors.type = `${page} Type input only 0 to 9.`
        } else if (values.type === '0') {
            errors.type = `Your ${page} Type first without start 0.`
        }
        if (!values.amount) {
            errors.amount = `Please enter your ${page} Amount.`
        } else if (!number.test(values.amount)) {
            errors.amount = `${page} Amount input only 0 to 9.`
        } else if (values.amount === '0') {
            errors.amount = `Your ${page} Amount first without start 0.`
        }
    }
    if (values.file) {
        errors.file = values.file
    }
    return errors;
}

export default CategoryValidation
