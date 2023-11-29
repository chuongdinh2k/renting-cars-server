import { CustomBaseEntity } from '@common/entities/baseEntity';
import { ERoles, UserMemberShipTypes } from '@common/interfaces/role.interface';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends CustomBaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  street: string;

  @Column()
  state_name: string;

  @Column()
  city: string;

  @Column({ unique: true })
  driver_license: string;

  @Column({
    type: 'enum',
    enum: UserMemberShipTypes,
    default: UserMemberShipTypes.NONE,
  })
  membership_types: UserMemberShipTypes;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ERoles, default: ERoles.USER })
  roles: ERoles;
}
