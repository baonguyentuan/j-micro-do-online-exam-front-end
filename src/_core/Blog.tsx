export interface Blog {
    id: string;
    title: string;
    description: string;
    createdAt: string;
  }

export interface CadBlog {
    blog: Blog;
}

  export interface BlogState {
    blogs: Blog[];
    loading: boolean;
    error: string | null;
  }
