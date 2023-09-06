import { Article } from "src/resources/articles/entities/article.entity";
import { User } from "src/resources/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, ObjectId, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    _id: ObjectId;

    @Column({length: 1200, nullable: false})
    textFr: string;

    @Column({length: 1200, nullable: false})
    textEn: string;

    @ManyToOne(() => User, user => user.comments)
    user: User;

    @ManyToOne(() => Article, article => article.comments)
    article: Article;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
