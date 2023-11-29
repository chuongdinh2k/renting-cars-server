import { CustomBaseEntity } from '@common/entities/baseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { EBillStatus } from '@common/interfaces/bill.interface';

@Entity('Billing')
export class BillingEntity extends CustomBaseEntity {
  @Column({ type: 'enum', enum: EBillStatus })
  status: EBillStatus;

  @Column()
  discount_amount: number;

  @Column()
  tax_amt: number;

  @Column()
  total_late_fee: number;

  @Column()
  total_amt: number;

  @OneToOne(() => BookingEntity, { eager: true })
  @JoinColumn({ name: 'booking_id' })
  booking: BookingEntity;
}
