import { CustomBaseEntity } from '@common/entities/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LocationEntity } from './location.entity';
import { CarEntity } from './car.entity';

@Entity('car_location')
export class CarLocationEntity extends CustomBaseEntity {
  @ManyToOne(() => LocationEntity, (location) => location, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  @ManyToOne(() => CarEntity, (car) => car.locations)
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @Column()
  available_number: number;
}
