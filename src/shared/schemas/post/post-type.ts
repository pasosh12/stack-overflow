export type ApiResponse = {
    data: {
        data: CodeFragment[];
    };
};

export type CodeFragment = {
    id: string;
    code: string;
    language: string;
    marks: Mark[];
    user: Author;
    comments: Comment[];
};

export type Mark = {
    id: string;
    type: 'like' | 'dislike';
    user: Author;
};

export type Author = {
    id: string;
    username: string;
    role: 'user' | 'admin';
};

export type Comment = {
    id: string;
    content: string;
};
