export class Post {
  id: number;
  title: string;
  text: string;
  short_text: string;
  author:  {
    id: number;
    username: string;
  };
  created_at: string;
  updated_at: string;
}
