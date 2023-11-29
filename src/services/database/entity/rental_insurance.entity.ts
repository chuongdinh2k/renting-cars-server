import { CustomBaseEntity } from '@common/entities/baseEntity';
import { ECoverageTypes } from '@common/interfaces/insurance.interface';
import { Column, Entity } from 'typeorm';

@Entity('rental_insurance')
export class RentalInsuranceEntity extends CustomBaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'enum', enum: ECoverageTypes })
  coverage_type: ECoverageTypes;

  @Column()
  cost_per_day: number;
}
