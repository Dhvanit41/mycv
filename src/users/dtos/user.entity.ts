import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  /// hook allows to create function
  @AfterInsert() // hook decoratedr
  logInsert() {
    console.log('inserted user', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated user', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('removed user', this.id);
  }
}
