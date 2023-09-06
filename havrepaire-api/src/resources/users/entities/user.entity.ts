import { Column, CreateDateColumn, Entity, ObjectId, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    _id: ObjectId;

    @Column({length: 80, nullable: false, unique: true})
    username: string;

    @Column({length: 236, nullable: false})
    hash: string;

    @Column({length: 120, nullable: false, unique: true})
    email: string;

    @Column({type: 'enum', enum: Gender, default: Gender.N, nullable: false})
    gender: Gender;

    @Column({ length: 80, nullable: true})
    pronouns: string;

    @Column({type: 'enum', enum: Role, default: Role.GHOST, nullable: false})
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
