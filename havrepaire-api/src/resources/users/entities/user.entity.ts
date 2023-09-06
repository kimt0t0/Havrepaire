import { Column, CreateDateColumn, Entity, ObjectId, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";
import { Like } from "src/resources/likes/entities/like.entity";
import { Comment } from "src/resources/comments/entities/comment.entity";
import { Article } from "src/resources/articles/entities/article.entity";
import { Illustration } from "src/resources/illustrations/entities/illustration.entity";

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

    @OneToOne(() => Illustration, illustration => illustration.user)
    avatar: Illustration;

    @OneToMany(() => Article, article => article.author)
    articles: Article[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
