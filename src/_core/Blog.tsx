import { PaginationModel } from "./common/Common";

export interface Blog {
    id: string;
    title: string;
    description: string;
    createdAt: string;
  }
  export interface BlogInfoModel {
    id: number;
    title: string;
    author: string;
    content: string;
    image:string| File
  }
export interface CadBlog {
    blog: Blog;
}

  export interface BlogState {
    blogs: BlogInfoModel[];
    loading: boolean;
    error: string | null;
    pagination: PaginationModel
  }
