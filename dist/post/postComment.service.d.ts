import { EditPostCommentInput, EditPostCommentOutput } from './dtos/editPostComment.dto';
import { User } from 'src/users/entities/user.entity';
import { CreatePostCommentInput, CreatePostCommentOutput } from './dtos/createPostComment.dto';
import { Post } from './entities/post.entity';
import { PostComment } from './entities/postComment.entity';
import { Repository } from 'typeorm';
import { DeletePostCommentInput, DeletePostCommentOutput } from './dtos/deletePostComment.dto';
import { PubSub } from 'graphql-subscriptions';
import { NoticeService } from 'src/users/notice.service';
import { MailService } from 'src/mail/mail.service';
export declare class PostCommentSerivce {
    private readonly mockExamQuestionComment;
    private readonly mockExamQuestion;
    private readonly pubSub;
    private readonly noticeService;
    private readonly mailService;
    constructor(mockExamQuestionComment: Repository<PostComment>, mockExamQuestion: Repository<Post>, pubSub: PubSub, noticeService: NoticeService, mailService: MailService);
    createPostComment(createPostCommentInput: CreatePostCommentInput, user: User): Promise<CreatePostCommentOutput>;
    editPostComment(editPostCommentInput: EditPostCommentInput, user: User): Promise<EditPostCommentOutput>;
    deletePostComment(deletePostCommentInput: DeletePostCommentInput, user: User): Promise<DeletePostCommentOutput>;
}
