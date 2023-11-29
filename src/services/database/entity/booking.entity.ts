import { CustomBaseEntity } from '@common/entities/baseEntity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { LocationEntity } from './location.entity';
import { CarEntity } from './car.entity';
import { UserEntity } from './user.entity';
import { EBookingStatus } from '@common/interfaces/booking.interface';
import { DiscountEntity } from './discount.entity';

@Entity('booking')
export class BookingEntity extends CustomBaseEntity {
  @Column()
  from_date: Date;

  @Column()
  return_date: Date;

  @Column({
    type: 'enum',
    enum: EBookingStatus,
    default: EBookingStatus.PROCESSING,
  })
  status: EBookingStatus;

  @ManyToOne(() => CarEntity, (car) => car, { eager: true })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  customer: UserEntity;

  @ManyToOne(() => LocationEntity, (location) => location, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'pickup_loc_id' })
  pickup_loc: LocationEntity;

  @ManyToOne(() => LocationEntity, (location) => location, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'drop_loc_id' })
  drop_loc: LocationEntity;

  @Column({ nullable: true })
  act_rt_time: Date;

  @ManyToOne(() => DiscountEntity, (discount) => discount, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'discount_id' })
  discount: DiscountEntity;

  @DeleteDateColumn()
  deleted_at: Date;
}
