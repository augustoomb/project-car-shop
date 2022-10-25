import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _serviceMoto: IService<IMotorcycle>) {}

  public async create(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const results = await this._serviceMoto.create(req.body);
    return res.status(201).json(results);
  }

  public async read(
    req: Request,
    res: Response,
  ) {
    const results = await this._serviceMoto.read();
    return res.status(200).json(results);
  }

  public async readOne(
    req: Request,
    res: Response,
  ) {
    const results = await this._serviceMoto.readOne(req.params.id);
    return res.status(200).json(results);
  }
  
  public async update(
    req: Request,
    res: Response,
  ) {
    const results = await this._serviceMoto.update(req.params.id, req.body);
    return res.status(200).json(results);
  }

  public async delete(
    req: Request,
    res: Response,
  ) {
    await this._serviceMoto.delete(req.params.id);
    return res.status(204).end();
  }
}
