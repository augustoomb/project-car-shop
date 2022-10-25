import { z } from 'zod';
import VehicleZodSchema from './IVehicle';

// Dica do extend: https://github.com/colinhacks/zod#objects
const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().lte(2500),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export default MotorcycleZodSchema;

export { IMotorcycle };
