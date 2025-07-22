import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";



const categories = [
  {
    id: "clothes",
    name: " Clothes",
    image: "/images/clothes.jpg",
    description: "Daura Suruwal, Sari, Gunyo Cholo",
  },
  {
    id: "food",
    name: "Nepali Food",
    image: "/images/food.jpg",
    description: "Dal Bhat, Momo, Sel Roti",
  },
  {
    id: "handicrafts",
    name: "Handicrafts",
    image: "/images/handicraft.jpg",
    description: "Wood Carvings, Pottery, Metalwork",
  },
  {
    id: "furniture",
    name: "Furniture",
    image: "/images/clothes.jpg",
    description: "Traditional Wooden Furniture",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/images/food.jpg",
    description: "Phones, Laptops, Accessories",
  },
  {
    id: "books",
    name: "Books",
    image: "/images/clothes.jpg",
    description: "Literature, Education, Culture",
  },
  {
    id: "herbs",
    name: "Herbs ",
    image: "/images/food.jpg",
    description: "Himalayan Herbs, Traditional Spices",
  },
  {
    id: "weed product",
    name: "Weed Product",
    image: "https://www.hempinnepal.com/wp-content/uploads/2021/02/nepal-hemp-bag-13.jpg",
    description: "Traditional Gold, Silver Jewelry",
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-[#E3E6E6]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Shop by Category</h2>
         <p className="text-xl text-center mx-auto mb-12
         text-gray-950">
            Explore our wide range of authentic Nepali products
          </p>
 <div className="grid grid-cols-4 gap-4">
  {categories.map((category) => (
    <Link key={category.id} to={`/products?category=${category.id}`}>
      <Card className=" shadow-2xl hover:shadow-amber-600  transition-shadow cursor-pointer bg-white flex flex-col justify-between p-3 border-none hover:border-amber-600">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-[20vw] md:h-[11vw]  rounded-none mb-0 transition-all"
        />
        <h3 className="font-bold text-[2vw] md:text-[1vw] text-center leading-snug">
          {category.name}
        </h3>
      </Card>
    </Link>
  ))}
</div>




      </div>
    </section>
  );
};

export default Categories;
