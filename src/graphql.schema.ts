
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    posts: Post[];
    createdAt: string;
    updatedAt: string;
}

export interface IQuery {
    getBlogbySlug(slug: string): Nullable<Blog> | Promise<Nullable<Blog>>;
}

type Nullable<T> = T | null;
