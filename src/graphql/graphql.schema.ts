
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateBlogDto {
    name: string;
    slug: string;
    posts?: Nullable<Nullable<CreatePostForBlogDto>[]>;
}

export interface CreatePostForBlogDto {
    title?: Nullable<string>;
    content: string;
}

export interface CreatePostDto {
    title?: Nullable<string>;
    content: string;
    blog: string;
}

export interface Post {
    id: string;
    title?: Nullable<string>;
    content: string;
    blog: string;
    createdAt: string;
    updatedAt: string;
}

export interface Blog {
    id: string;
    name: string;
    slug: string;
    posts?: Nullable<Nullable<Post>[]>;
    createdAt: string;
    updatedAt: string;
}

export interface IQuery {
    getBlogbySlug(slug: string): Nullable<Blog> | Promise<Nullable<Blog>>;
    getBlogbyId(id: string): Nullable<Blog> | Promise<Nullable<Blog>>;
}

export interface IMutation {
    createBlogwithPosts(blog: CreateBlogDto): Nullable<Blog> | Promise<Nullable<Blog>>;
    createPost(post: CreatePostDto): Nullable<Post> | Promise<Nullable<Post>>;
}

type Nullable<T> = T | null;
