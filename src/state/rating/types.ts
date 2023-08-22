export type RatingState = {
  raiting: RatingItem[];
  myRating: string;
  loading: boolean;
};
export type RatingItem = {
  id: number;
  name: string;
  rating: number;
  orderCount: number;
  dynamic: number;
};
