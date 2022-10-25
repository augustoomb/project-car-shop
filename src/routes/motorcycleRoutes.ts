import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcyclesModel from '../models/MotorcyclesModel';
import MotorcycleService from '../services/MotorcycleService';

const motorcycleRoute = Router();

const motorcyclesModel = new MotorcyclesModel();
const motorcycleService = new MotorcycleService(motorcyclesModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const urlBase = '/motorcycles';

motorcycleRoute.post(urlBase, (req, res) => motorcycleController.create(req, res));
motorcycleRoute.get(urlBase, (req, res) => motorcycleController.read(req, res));
motorcycleRoute.get(`${urlBase}/:id`, (req, res) => motorcycleController.readOne(req, res));
motorcycleRoute.put(`${urlBase}/:id`, (req, res) => motorcycleController.update(req, res));
motorcycleRoute.delete(`${urlBase}/:id`, (req, res) => motorcycleController.delete(req, res));

export default motorcycleRoute;
