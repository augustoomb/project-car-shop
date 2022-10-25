import { ErrorTypes } from '../erros/catalog';
import MotorcycleZodSchema, { IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  private _MotorcycleModel:IModel<IMotorcycle>;

  constructor(model:IModel<IMotorcycle>) {
    this._MotorcycleModel = model;
  }

  public async create(obj: unknown):Promise<IMotorcycle> {
    const parsedMoto = MotorcycleZodSchema.safeParse(obj); // vendo se o obj está no formato correto

    if (!parsedMoto.success) {
      throw parsedMoto.error;
    }

    return this._MotorcycleModel.create(parsedMoto.data);
  }

  public async read():Promise<IMotorcycle[]> {
    const moto = await this._MotorcycleModel.read();
    return moto;
  }

  public async readOne(_id: string):Promise<IMotorcycle | null> {
    const moto = await this._MotorcycleModel.readOne(_id);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    return moto;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle | null> {
    const parsedMoto = MotorcycleZodSchema.safeParse(obj); // vendo se o obj está no formato correto

    if (!parsedMoto.success) {
      throw parsedMoto.error;
    }

    const moto = await this._MotorcycleModel.update(_id, parsedMoto.data);

    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    return moto;
  }
  // public async update(_id: string, obj: unknown): Promise<IMotorcycle | null> {
  //   const parsedMoto = MotorcycleZodSchema.safeParse(obj); // vendo se o obj está no formato correto

  //   if (!parsedMoto.success) {
  //     throw parsedMoto.error;
  //   }

  //   const moto = await this._MotorcycleModel.update(_id, parsedMoto.data);

  //   if (!moto) throw new Error(ErrorTypes.EntityNotFound);
  //   return moto;
  // }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const moto = await this._MotorcycleModel.delete(_id);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    return moto;
  }
}

export default MotorcycleService;
