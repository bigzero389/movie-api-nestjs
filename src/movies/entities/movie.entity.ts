import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('movie')
export class Movie {
  // @Column()
  @PrimaryColumn()
  @Index({ unique: true })
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  // genres: string[];
}
