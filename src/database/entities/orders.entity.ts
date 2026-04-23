import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ type: 'timestamp' }) // Or 'date' depending on your DB
  issuedAt: Date;

  @Column() // No need to put 'String' inside here for basic strings
  name: string;

  @Column('float')
  price: number;

  @Column()
  quantity: number;
}
