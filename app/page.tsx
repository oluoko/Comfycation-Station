import { getHotels } from "@/actions/getHotels";
import { Button } from "@/components/ui/button";

interface HomeProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const hotels = await getHotels(searchParams);

  if (!hotels) return <div>There are no hotels</div>;
  return <div className="">Home Page</div>;
}
