import { CustomBaseEntity } from '@common/entities/baseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { CarLocationEntity } from './car_location.entity';

@Entity('location')
export class LocationEntity extends CustomBaseEntity {
  @Column()
  location_name: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state_name: string;

  @Column()
  zip_code: string;

  @OneToMany(() => CarLocationEntity, (carLocation) => carLocation.location, {
    onDelete: 'CASCADE',
  })
  car_locations: CarLocationEntity[];
}
