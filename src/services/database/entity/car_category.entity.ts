import { CustomBaseEntity } from '@common/entities/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('car_category')
export class CategoryEntity extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  number_of_person: number;

  @Column()
  cost_per_day: number;

  @Column()
  late_fee_per_hour: number;

  @Column()
  number_of_luggages: number;
}
