import Hero from "@/components/home/Hero";
import DeliveryTeaser from "@/components/home/DeliveryTeaser";
import InstagramFeed from "@/components/home/InstagramFeed";
import { getInstagramPhotos } from "@/lib/getInstagramPhotos";

export default function Home() {
  const photos = getInstagramPhotos();

  return (
    <>
      <Hero />
      <DeliveryTeaser />
      <InstagramFeed photos={photos} />
    </>
  );
}
