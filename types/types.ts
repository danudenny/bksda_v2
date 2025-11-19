export interface Author {
    id: string;
    name: string;
    email: string;
    role?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    coverImage: string;
    imageUrl?: string; // This seems to be a legacy or alternative field
    description: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    categoryId: string;
    author: Author;
    category: Category;
    // Properties added on the client-side
    href?: string;
    date?: string;
    datetime?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    message: string;
    success: boolean;
    timestamp: string;
}
