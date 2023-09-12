import { Comment } from "src/resources/comments/schemas/comment.schema";
import { Like } from "src/resources/likes/schemas/like.schema";
import { decodeToken } from "./token.utils";

export const checkAuthor = (request, item: Comment | Like): boolean => {
    const token = request.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
    const decodedToken = decodeToken(token);
    return (decodedToken._id === item.author._id.toString());
}