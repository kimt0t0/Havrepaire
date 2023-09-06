import { Article } from "src/resources/articles/entities/article.entity";
import { User } from "src/resources/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, ObjectId, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Illustration {
    @PrimaryGeneratedColumn('uuid')
    _id: ObjectId;

    @Column({length: 80, nullable: false})
    filename: string;

    @Column({length: 256})
    filepath: string;

    @OneToOne(() => User, user => user.avatar)
    user: User;

    @ManyToOne(() => Article, article => article.illustrations)
    article: Article;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
