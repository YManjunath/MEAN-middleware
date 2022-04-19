const express = require('express');

const app = express();

const employeeRoute = express.Router();

const employeeModel = require('../Model/Employee');

// Get all employees
employeeRoute.route('/').get((req, res) => {
    employeeModel.find((err, employee) => {
        if (err) {
            console.log(err)
        } else {
            res.json(employee)
        }
    })
})

// To Add New Employee
employeeRoute.route('/addEmployee').post((req, res) => {
    let employee = new employeeModel(req.body);
    employee.save()
        .then(employee => {
            res.status(200).json({
                'employee': 'Employee Added Successfully'
            });
        })
        .catch(err => {
            res.status(400).send("Something Went Wrong");
        });
});

// To Get Employee Details By Employee ID
employeeRoute.route('/addEmployee/:id').get((req, res) => {
    let id = req.params.id;
    employeeModel.findById(id, (err, employee) => {
        res.json(employee);
    });
});

employeeRoute.route('/editEmployee/:id').get((req, res) => {
    let id = req.params.id;
    employeeModel.findById(id, (err, employee) => {
        res.json(employee);
    });
});

// update employee
employeeRoute.route('/updateEmployee/:id').post((req, res) => {
    debugger;
    let id = req.params.id;
    employeeModel.findById(id, (err, employee) => {
        if (!employee)
            return new Error('Could not load document')
        else {
            employee.firstName = req.body.firstName;
            employee.lastName = req.body.lastName;
            employee.email = req.body.email;
            employee.phone = req.body.phone;

            employee.save().then(employee => {
                    res.status(200).json({
                        'employee': 'Employee Updated Successfully'
                    });
                })
                .catch(err => {
                    res.status(400).send("Something Went Wrong");
                });
        }
    })
})

employeeRoute.route('/delete/:id').delete(function (req, res) {
    employeeModel.findByIdAndRemove({
        _id: req.params.id
    }, function (err, employee) {
        if (err) {
            res.json(err)
            console.log(err);
        } else {
            res.json('Successfully removed');
        }
    });
});


module.exports = employeeRoute;