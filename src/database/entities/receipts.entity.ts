import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  receiptId: string; // Use lowercase 'string' (TypeScript best practice)

  @Column({ type: 'timestamp' }) // Or 'date' depending on your DB
  issuedAt: Date;

  @Column() // No need to put 'String' inside here for basic strings
  name: string;

  @Column('float')
  price: number;
}
