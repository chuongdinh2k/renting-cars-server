import { CustomBaseEntity } from '@common/entities/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CategoryEntity } from './car_category.entity';
import { CarLocationEntity } from './car_location.entity';
import { BookingEntity } from './booking.entity';

@Entity('car')
export class CarEntity extends CustomBaseEntity {
  @Column({ unique: true })
  model_name: string;

  @Column()
  make: string;

  @Column()
  model_year: string;

  @Column({ nullable: false })
  thumbnail: string;

  @ManyToOne(() => CategoryEntity, (carCategory) => carCategory, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => CarLocationEntity, (carLocation) => carLocation.car, {
    onDelete: 'CASCADE',
  })
  locations: CarLocationEntity[];
}
