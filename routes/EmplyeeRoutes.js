// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeService = require('../Service/employeeService');

// Créer un employé
router.post('/employees', async (req, res) => {
  const { name, email, position, salary } = req.body;
  const newEmployee = await employeeService.createEmployee(name, email, position, salary);
  res.status(201).json(newEmployee);
});

// Récupérer tous les employés
router.get('/employees', async (req, res) => {
  const employees = await employeeService.getAllEmployees();
  res.status(200).json(employees);
});

// Récupérer un employé par ID
router.get('/employees/:id', async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Mettre à jour un employé
router.put('/employees/:id', async (req, res) => {
  const { name, email, position, salary } = req.body;
  const updatedEmployee = await employeeService.updateEmployee(req.params.id, name, email, position, salary);
  if (updatedEmployee) {
    res.status(200).json(updatedEmployee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Supprimer un employé
router.delete('/employees/:id', async (req, res) => {
  const deletedEmployee = await employeeService.deleteEmployee(req.params.id);
  if (deletedEmployee) {
    res.status(200).json(deletedEmployee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

module.exports = router;