import { Column, CreateDateColumn, Entity, ManyToOne, ObjectId, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { State } from "../enums/state.enum";
import { Illustration } from "src/resources/illustrations/entities/illustration.entity";
import { Like } from "src/resources/likes/entities/like.entity";
import { Comment } from "src/resources/comments/entities/comment.entity";
import { User } from "src/resources/users/entities/user.entity";

@Entity()
export class Article {
    @PrimaryColumn('uuid')
    _id: ObjectId;

    @Column({length: 120, nullable: false, unique: true})
    titleFr: string;

    @Column({nullable: false})
    parapraphsFr: string[];

    @Column({type: 'enum', enum: State, default: State.DRAFT})
    state: State;

    @ManyToOne(() => User, user => user.articles)
    author: User;

    @OneToMany(() => Illustration, illustration => illustration.article)
    illustrations: Illustration[];

    @OneToMany(() => Like, like => like.article)
    likes: Like[];

    @OneToMany(() => Comment, comment => comment.article)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
