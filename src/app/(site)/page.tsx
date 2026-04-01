import Hero from "@/components/home/Hero";
import InstagramFeed from "@/components/home/InstagramFeed";
import { getInstagramPhotos } from "@/lib/getInstagramPhotos";

export default function Home() {
  const photos = getInstagramPhotos();

  return (
    <>
      <Hero />
      <InstagramFeed photos={photos} />
    </>
  );
}
