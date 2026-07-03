import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedDishes from "@/components/FeaturedDishes";
import MenuCategories from "@/components/MenuCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedDishes />
        <MenuCategories />
        <WhyChooseUs />
        <Gallery />
      </main>
    </>
  );
}
