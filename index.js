const mongoose = require('mongoose');

//Map global promise - get ride of warning
mongoose.Promise = global.Promise;
//Connect to db
// const db = mongoose.connect('mongodb://localhost:27017/customercli',{
// });

mongoose.connect("mongodb://localhost:27017/customercli", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () =>{
    
});



// Import model
const Customer = require('./models/customer');
// Add Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer =>{
        console.info('New Customer added.');
        db.close();
    });
}

// Find Customer
const findCustomer = (name) =>{
    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstname: search}, {lastname: search}]})
    .then(customer =>{
        console.info(customer);
        console.info(`${customer.length} matches found.`);
        db.close();
    });
}

// Update Customer
const updateCustomer = (_id, customer) => {
    Customer.updateOne({ _id }, customer, {new: true, useFindAndModify: false})
        .then(customer => {
            console.info('Customer Updated');
            db.close();

        });
}

// Remove Customer
const removeCustomer = (_id) => {
    Customer.deleteOne({ _id })
        .then(customer => {
            console.info('Customer Removed');
            db.close();

        });
}

// List All Customers
const listCustomers = () => {
    Customer.find()
        .then(customers =>{
            console.info(customers);
            console.info(`${customers.length} customers found.`);
            db.close();
        });
}

// Export All Methods
module.exports = {
    addCustomer, 
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}