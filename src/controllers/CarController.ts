import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _serviceCar: IService<ICar>) {}

  public async create(
    req: Request,
    res: Response,
  ) {
    // const results = await this._serviceCar.create(req.body);
    // return res.status(201).json(results);
    try {
      const results = await this._serviceCar.create(req.body);
      return res.status(201).json(results);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  public async read(
    req: Request,
    res: Response,
  ) {
    const results = await this._serviceCar.read();
    return res.status(200).json(results);
  }

  public async readOne(
    req: Request,
    res: Response,
  ) {
    try {
      const results = await this._serviceCar.readOne(req.params.id);
      if (!results) { 
        return res.status(400).json({ error: 'Id must have 24 hexadecimal characters' });
      }
      return res.status(200).json(results);
    } catch (error) {
      return res.status(404).json({ error: 'Object not found' });
    }
  }
}