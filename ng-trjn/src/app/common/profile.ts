export class Profile {
  bio: string;
  picture: string;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  identities: [
    {
      provider: string;
      external_id: string;
    }
  ];
}
