import { z } from 'zod';
import VehicleZodSchema from './IVehicle';

// Dica do extend: https://github.com/colinhacks/zod#objects
const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type ICar = z.infer<typeof CarZodSchema>;

export default CarZodSchema;

export { ICar };
