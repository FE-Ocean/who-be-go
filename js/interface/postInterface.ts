export default interface PostInterface {
    id: string;
    content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    hearted: boolean;
    heartCount: number;
    commentCount: number;
    author: {
        _id: string;
        username: string;
        accountname: string;
        following: string[];
        follower: string[];
        followerCount: number;
        followingCount: number;
    };
}
