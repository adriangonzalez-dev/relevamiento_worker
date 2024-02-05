import { Agente } from './Agent.entity';
import { Country } from './Country.entity';
import { Segment } from './Segment.entity';
import { Type } from './Type.entity';
import { Via } from './Via.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', {
    nullable: true,
  })
  id_invgate: number;

  @ManyToOne(() => Agente, (agent) => agent.id, { cascade: true })
  agent: number;

  @Column('text')
  request: string;

  @ManyToOne(() => Type, (type) => type.id, { cascade: true })
  type: number;

  @ManyToOne(() => Country, (country) => country.id, {
    cascade: true,
  })
  country: number;

  @Column('text')
  request_date: number;

  @Column('text', {
    nullable: true,
  })
  implementation_date: number | null | undefined;

  @ManyToOne(() => Segment, (seg) => seg.id, { cascade: true })
  segment?: number | null;

  @ManyToOne(() => Via, (via) => via.id, { cascade: true })
  via: number;
}
