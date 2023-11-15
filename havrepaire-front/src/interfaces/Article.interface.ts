import type { Categories } from "@/enums/categories.enum";
import type { ArticleState } from "@/enums/users/article-state.enum";
import type { ObjectId } from "mongodb";
import type { Comment } from "./Comment.interface";
import type { Illustration } from "./Illustration.interface";
import type { Like } from "./Like.interface";

export interface Article {
    _id: string | ObjectId;
    titleFr: string;
    titleEn?: string;
    textFr: string;
    textEn?: string;
    categories: Categories[];
    state: ArticleState;
    illustration: void | string | ObjectId | Illustration;
    likes: string[] | ObjectId[] | Like[];
    comments: string[] | ObjectId[] | Comment[];
    createdAt: Date;
    updatedAt: Date;
}