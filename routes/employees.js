const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Ajouter un Employé
router.post('/', async (req, res) => {
  const employee = new Employee(req.body);

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtenir Tous les Employés
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mettre à Jour un Employé
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employé non trouvé' });

    Object.assign(employee, req.body);
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un Employé
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employé non trouvé' });

    await employee.remove();
    res.json({ message: 'Employé supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
