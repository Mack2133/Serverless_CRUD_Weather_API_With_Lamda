import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('City')
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: number
    @Column("varchar")
    city: string
    @Column('float')
    lat: number
    @Column('float')
    lon: number
    @Column("varchar")
    country: string
    @Column("varchar")
    state: string
}