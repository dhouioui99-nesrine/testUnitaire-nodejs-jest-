
const Employee = require('../models/employee');

// Créer un nouvel employé
const createEmployee = async (name, email, position, salary) => {
    const newEmployee = new Employee({ name, email, position, salary });
    await newEmployee.save(); // Sauvegarder dans la base de données
    return newEmployee;
  };
  
  // Récupérer tous les employés
  const getAllEmployees = async () => {
    return await Employee.find();
  };
  
  // Récupérer un employé par son ID
  const getEmployeeById = async (id) => {
    return await Employee.findById(id);
  };
  
  // Mettre à jour un employé
  const updateEmployee = async (id, name, email, position, salary) => {
    const employee = await Employee.findById(id);
    if (employee) {
      employee.name = name || employee.name;
      employee.email = email || employee.email;
      employee.position = position || employee.position;
      employee.salary = salary || employee.salary;
      await employee.save();
      return employee;
    }
    return null;
  };
  
  // Supprimer un employé
  const deleteEmployee = async (id) => {
    const employee = await Employee.findById(id);
    if (employee) {
      await employee.remove();
      return employee;
    }
    return null;
  };
  
  module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee };