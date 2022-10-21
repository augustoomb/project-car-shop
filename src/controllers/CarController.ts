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
}