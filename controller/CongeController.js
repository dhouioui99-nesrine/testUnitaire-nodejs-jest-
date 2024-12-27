const Conge = require('../models/Conge');

const createC = async (req, res) => {
  try {
    const { debut, fin, raison } = req.body;
    const conge = new Conge({
  
      debut,
      fin,
      raison
    });

    console.log(conge);
    const savedConge = await conge.save();
    res.status(201).send(savedConge);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
};



// Obtenir toutes les demandes de congé (pour les RH uniquement)
 const getAllConge = async (req, res) => {
  try {
    const Conge = await Conge.find().populate('employeeId');
    res.status(200).send(Conge);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtenir une demande spécifique (pour l'employé)
 const getConge = async (req, res) => {
  try {
    const Conge = await Conge.findById(req.params.id).populate('employeeId');
    if (!Conge) {
      return res.status(404).send('Conge not found');
    }
    res.status(200).send(Conge);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Approuver ou refuser une demande de congé (pour les RH uniquement)
 const updateCongeStatus = async (req, res) => {
  try {
    const Conge = await Conge.findById(req.params.id);

    if (!Conge) {
      return res.status(404).send('Conge not found');
    }

    if (Conge.status !== 'en attente ') {
      return res.status(400).send('This request has already been processed');
    }

    Conge.status = req.body.status;
    Conge.approverId = req.user._id;
    await Conge.save();

    res.status(200).send(Conge);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Supprimer une demande de congé (pour l'employé ou les RH)
 const deleteConge = async (req, res) => {
  try {
    const Conge = await Conge.findByIdAndDelete(req.params.id);

    if (!Conge) {
      return res.status(404).send('Conge not found');
    }

    res.status(200).send('Conge deleted');
  } catch (error) {
    res.status(400).send(error);
  }
};


module.exports = {createC,getConge,getAllConge,updateCongeStatus,deleteConge};