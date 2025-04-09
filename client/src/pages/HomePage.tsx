import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ExhibitionDetails } from "@/components/home/ExhibitionDetails";

export default function HomePage() {
  return (
    <Layout fullHeight>
      <Hero />
      <ExhibitionDetails />
    </Layout>
  );
}
