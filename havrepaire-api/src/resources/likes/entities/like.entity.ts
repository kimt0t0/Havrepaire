import { Article } from "src/resources/articles/entities/article.entity";
import { User } from "src/resources/users/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, ObjectId, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn('uuid')
    _id: ObjectId;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @ManyToOne(() => Article, article => article.likes)
    article: Article;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
