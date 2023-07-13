export type Json =
| string
| number
| boolean
| null
| { [key: string]: Json }
| Json[];

export interface Database {
public: {
  Tables: {
    users: {
      Row: {
        id: string;
        address: string;
        email: string;
        updated_at: number;
      };
      Insert: {
        id?: string;
        address?: string;
        email?: string;
        updated_at?: number;
      };
      Update: {
        id?: string;
        address?: string;
        email?: string;
        updated_at?: number;
      };
    };
  };
  Views: {};
  Functions: {};
  Enums: {};
};
}