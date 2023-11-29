import { CustomBaseEntity } from '@common/entities/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('discount')
export class DiscountEntity extends CustomBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  codes: string;

  @Column()
  expiry_date: Date;

  @Column()
  percentage: number;
}
