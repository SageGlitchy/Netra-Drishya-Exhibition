import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { PhotoGrid } from "@/components/home/PhotoGrid";
import { ExhibitionDetails } from "@/components/home/ExhibitionDetails";
import { FeaturedPhotographers } from "@/components/home/FeaturedPhotographers";

export default function HomePage() {
  return (
    <Layout fullHeight>
      <Hero />
      <PhotoGrid />
      <ExhibitionDetails />
      <FeaturedPhotographers />
    </Layout>
  );
}
