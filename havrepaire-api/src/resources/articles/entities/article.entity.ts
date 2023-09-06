import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryColumn('uuid')
    id: string;
}
