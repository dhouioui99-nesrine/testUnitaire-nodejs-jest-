// tests/employeeRoutes.test.js
const request = require('supertest');
const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const employeeRoutes = require('../routes/EmplyeeRoutes');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI

const DATABASE_NAME = process.env.DATABASE_NAME;
const app = express();
app.use(bodyParser.json());
app.use('/api', employeeRoutes);

// Avant d'exécuter les tests, se connecter à MongoDB
beforeAll(async () => {
  await mongoose.connect(MONGODB_URI+DATABASE_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Après avoir terminé les tests, se déconnecter de la base de données
afterAll(async () => {
    // Déconnecter Mongoose après tous les tests
    await mongoose.connection.close();
  });
describe('Employee Routes', () => {
  it('should create a new employee', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send({ name: 'Alice Cooper', email: 'alice@example.com', position: 'Designer', salary: 50000 });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Alice Cooper');
    expect(response.body.email).toBe('alice@example.com');
    expect(response.body.position).toBe('Designer');
    expect(response.body.salary).toBe(50000);
  });

  it('should get all employees', async () => {
    const response = await request(app).get('/api/employees');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get an employee by id', async () => {
    const employee = await request(app)
      .post('/api/employees')
      .send({ name: 'John Doe', email: 'john@example.com', position: 'Developer', salary: 60000 });
    const response = await request(app).get(`/api/employees/${employee.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('john@example.com');
  });

  it('should update an employee', async () => {
    const email = `john-${Date.now()}@example.com`; // Email unique
  
    // Créez un employé
    const employee = await request(app)
      .post('/api/employees')
      .send({
        name: 'John Doe',
        email,
        position: 'Developer',
        salary: 60000
      });
    expect(employee.body._id).toBeDefined();
  
    // Mettez à jour l'employé
    const response = await request(app)
      .put(`/api/employees/${employee.body._id}`)
      .send({
        name: 'John Updated', 
        email, 
        position: 'Senior Developer', 
        salary: 75000 
      });
  
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
    expect(response.body.name).toBe('John Updated');
    expect(response.body.email).toBe(email);
    expect(response.body.position).toBe('Senior Developer');
    expect(response.body.salary).toBe(75000);
  });

  it('should return an error if employee does not exist on delete', async () => {
    // Utiliser un ID d'employé qui n'existe pas dans la base de données
    const nonExistentId = '613b6f1f4d1c60f1c8b1d0b2'; // Remplacer par un ID fictif
  
    // Tentative de suppression de l'employé avec un ID inexistant
    const response = await request(app)
      .delete(`/api/employees/${nonExistentId}`);
  
    // Vérifier que la réponse a un statut 404 et le bon message d'erreur
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Employee not found');
  });





});
