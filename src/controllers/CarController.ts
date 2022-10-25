import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _serviceCar: IService<ICar>) {}

  public async create(
    req: Request,
    res: Response<ICar>,
  ) {
    const results = await this._serviceCar.create(req.body);
    return res.status(201).json(results);
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
    const results = await this._serviceCar.readOne(req.params.id);
    return res.status(200).json(results);
  }
  
  public async update(
    req: Request,
    res: Response,
  ) {
    const results = await this._serviceCar.update(req.params.id, req.body);
    return res.status(200).json(results);
  }

  public async delete(
    req: Request,
    res: Response,
  ) {
    await this._serviceCar.delete(req.params.id);
    return res.status(204).end();
  }
}
