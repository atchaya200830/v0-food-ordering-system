"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Search } from "lucide-react"
import MenuCard from "@/components/menu-card"
import Header from "@/components/header"

const MENU_ITEMS = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, basil, and tomato sauce",
    price: 12.99,
    image: "/margherita-pizza.png",
    category: "Italian",
    type: "Veg",
  },
  {
    id: 2,
    name: "Garlic Bread",
    description: "Crispy bread with garlic and herbs",
    price: 4.99,
    image: "/garlic-bread.png",
    category: "Appetizers",
    type: "Veg",
  },
  {
    id: 3,
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with cheese and sauce",
    price: 13.99,
    image: "/pepperoni-pizza.png",
    category: "Pizza",
    type: "Non-Veg",
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Fresh romaine with parmesan and croutons",
    price: 8.99,
    image: "/caesar-salad.png",
    category: "Salads",
    type: "Veg",
  },
  {
    id: 5,
    name: "Veggie Pizza",
    description: "Loaded with fresh vegetables",
    price: 11.99,
    image: "/veggie-pizza.png",
    category: "Pizza",
    type: "Veg",
  },
  {
    id: 6,
    name: "Bruschetta",
    description: "Toasted bread with tomato and basil",
    price: 5.99,
    image: "/classic-bruschetta.png",
    category: "Appetizers",
    type: "Veg",
  },
  {
    id: 7,
    name: "Butter Chicken",
    description: "Tender chicken in creamy tomato-based sauce",
    price: 13.99,
    image: "/butter-chicken.jpg",
    category: "North Indian",
    type: "Non-Veg",
  },
  {
    id: 8,
    name: "Biryani",
    description: "Fragrant basmati rice with spiced meat",
    price: 11.99,
    image: "/biryani.jpg",
    category: "North Indian",
    type: "Non-Veg",
  },
  {
    id: 9,
    name: "Tandoori Chicken",
    description: "Marinated chicken cooked in clay oven",
    price: 12.99,
    image: "/tandoori-chicken.jpg",
    category: "North Indian",
    type: "Non-Veg",
  },
  {
    id: 10,
    name: "Naan Bread",
    description: "Soft flatbread baked in tandoor",
    price: 3.99,
    image: "/naan.jpg",
    category: "North Indian",
    type: "Veg",
  },
  {
    id: 11,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes with peppers",
    price: 9.99,
    image: "/paneer-tikka.jpg",
    category: "North Indian",
    type: "Veg",
  },
  {
    id: 12,
    name: "Dal Makhani",
    description: "Creamy lentil curry with butter and cream",
    price: 10.99,
    image: "/dal-makhani.jpg",
    category: "North Indian",
    type: "Veg",
  },
  {
    id: 13,
    name: "Chana Masala",
    description: "Spiced chickpea curry with onions and tomatoes",
    price: 8.99,
    image: "/chana-masala.jpg",
    category: "North Indian",
    type: "Veg",
  },
  {
    id: 14,
    name: "Palak Paneer",
    description: "Cottage cheese in spinach gravy",
    price: 10.99,
    image: "/palak-paneer.jpg",
    category: "North Indian",
    type: "Veg",
  },
  {
    id: 15,
    name: "Vegetable Biryani",
    description: "Fragrant rice with mixed vegetables",
    price: 9.99,
    image: "/veg-biryani.jpg",
    category: "North Indian",
    type: "Veg",
  },
  {
    id: 16,
    name: "Aloo Paratha",
    description: "Flatbread stuffed with spiced potatoes",
    price: 5.99,
    image: "/aloo-paratha.jpg",
    category: "North Indian",
    type: "Veg",
  },
  {
    id: 17,
    name: "Mushroom Fried Rice",
    description: "Stir-fried rice with mushrooms and vegetables",
    price: 9.99,
    image: "/mushroom-fried-rice.jpg",
    category: "Asian",
    type: "Veg",
  },
  {
    id: 18,
    name: "Vegetable Momos",
    description: "Steamed dumplings filled with vegetables",
    price: 7.99,
    image: "/veg-momos.jpg",
    category: "Appetizers",
    type: "Veg",
  },
  {
    id: 19,
    name: "Chicken Tikka Masala",
    description: "Grilled chicken in creamy tomato sauce",
    price: 14.99,
    image: "/chicken-tikka-masala.jpg",
    category: "North Indian",
    type: "Non-Veg",
  },
  {
    id: 20,
    name: "Mutton Rogan Josh",
    description: "Tender mutton in aromatic gravy",
    price: 15.99,
    image: "/mutton-rogan-josh.jpg",
    category: "North Indian",
    type: "Non-Veg",
  },
  {
    id: 21,
    name: "Fish Curry",
    description: "Fresh fish in spicy coconut curry",
    price: 13.99,
    image: "/fish-curry.jpg",
    category: "Asian",
    type: "Non-Veg",
  },
  {
    id: 22,
    name: "Prawn Biryani",
    description: "Basmati rice with succulent prawns",
    price: 14.99,
    image: "/prawn-biryani.jpg",
    category: "North Indian",
    type: "Non-Veg",
  },
  {
    id: 23,
    name: "Chicken Fried Rice",
    description: "Stir-fried rice with tender chicken",
    price: 11.99,
    image: "/chicken-fried-rice.jpg",
    category: "Asian",
    type: "Non-Veg",
  },
  {
    id: 24,
    name: "Chicken Momos",
    description: "Steamed dumplings with seasoned chicken",
    price: 8.99,
    image: "/chicken-momos.jpg",
    category: "Appetizers",
    type: "Non-Veg",
  },
  {
    id: 25,
    name: "Kung Pao Chicken",
    description: "Spicy chicken with peanuts and vegetables",
    price: 11.99,
    image: "/kung-pao-chicken.jpg",
    category: "Chinese",
    type: "Non-Veg",
  },
  {
    id: 26,
    name: "Mapo Tofu",
    description: "Silky tofu in spicy bean sauce with minced pork",
    price: 10.99,
    image: "/mapo-tofu.jpg",
    category: "Chinese",
    type: "Non-Veg",
  },
  {
    id: 27,
    name: "Vegetable Lo Mein",
    description: "Stir-fried noodles with mixed vegetables",
    price: 9.99,
    image: "/veg-lo-mein.jpg",
    category: "Chinese",
    type: "Veg",
  },
  {
    id: 28,
    name: "Peking Duck",
    description: "Crispy roasted duck with plum sauce",
    price: 15.99,
    image: "/peking-duck.jpg",
    category: "Chinese",
    type: "Non-Veg",
  },
  {
    id: 29,
    name: "Hot and Sour Soup",
    description: "Tangy and spicy soup with vegetables and tofu",
    price: 6.99,
    image: "/hot-sour-soup.jpg",
    category: "Chinese",
    type: "Veg",
  },
  {
    id: 30,
    name: "Mongolian Beef",
    description: "Tender beef with scallions in brown sauce",
    price: 13.99,
    image: "/mongolian-beef.jpg",
    category: "Chinese",
    type: "Non-Veg",
  },
  {
    id: 31,
    name: "Green Curry",
    description: "Aromatic green curry with coconut milk and basil",
    price: 11.99,
    image: "/green-curry.jpg",
    category: "Thai",
    type: "Non-Veg",
  },
  {
    id: 32,
    name: "Pad Thai",
    description: "Stir-fried rice noodles with shrimp and peanuts",
    price: 12.99,
    image: "/pad-thai.jpg",
    category: "Thai",
    type: "Non-Veg",
  },
  {
    id: 33,
    name: "Tom Yum Soup",
    description: "Hot and sour soup with lemongrass and lime",
    price: 7.99,
    image: "/tom-yum-soup.jpg",
    category: "Thai",
    type: "Non-Veg",
  },
  {
    id: 34,
    name: "Vegetable Pad Thai",
    description: "Stir-fried rice noodles with fresh vegetables",
    price: 9.99,
    image: "/veg-pad-thai.jpg",
    category: "Thai",
    type: "Veg",
  },
  {
    id: 35,
    name: "Massaman Curry",
    description: "Rich curry with peanuts and potatoes",
    price: 12.99,
    image: "/massaman-curry.jpg",
    category: "Thai",
    type: "Non-Veg",
  },
  {
    id: 36,
    name: "Spring Rolls",
    description: "Crispy rolls filled with vegetables and meat",
    price: 7.99,
    image: "/spring-rolls.jpg",
    category: "Thai",
    type: "Non-Veg",
  },
  {
    id: 37,
    name: "Chicken Enchiladas",
    description: "Rolled tortillas with chicken in spicy sauce",
    price: 13.99,
    image: "/chicken-enchiladas.jpg",
    category: "Mexican",
    type: "Non-Veg",
  },
  {
    id: 38,
    name: "Beef Tacos",
    description: "Seasoned beef in crispy taco shells with toppings",
    price: 11.99,
    image: "/beef-tacos.jpg",
    category: "Mexican",
    type: "Non-Veg",
  },
  {
    id: 39,
    name: "Vegetable Quesadilla",
    description: "Grilled tortilla with cheese and vegetables",
    price: 9.99,
    image: "/veg-quesadilla.jpg",
    category: "Mexican",
    type: "Veg",
  },
  {
    id: 40,
    name: "Chiles Rellenos",
    description: "Stuffed peppers with cheese and sauce",
    price: 12.99,
    image: "/chiles-rellenos.jpg",
    category: "Mexican",
    type: "Veg",
  },
  {
    id: 41,
    name: "Carne Asada",
    description: "Grilled marinated beef with lime and cilantro",
    price: 14.99,
    image: "/carne-asada.jpg",
    category: "Mexican",
    type: "Non-Veg",
  },
  {
    id: 42,
    name: "Churros",
    description: "Fried pastry sticks with cinnamon sugar",
    price: 5.99,
    image: "/churros.jpg",
    category: "Mexican",
    type: "Veg",
  },
  {
    id: 43,
    name: "Lasagna",
    description: "Layered pasta with meat sauce and cheese",
    price: 13.99,
    image: "/lasagna.jpg",
    category: "Italian",
    type: "Non-Veg",
  },
  {
    id: 44,
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon and parmesan",
    price: 12.99,
    image: "/pasta-carbonara.jpg",
    category: "Italian",
    type: "Non-Veg",
  },
  {
    id: 45,
    name: "Risotto",
    description: "Creamy arborio rice with mushrooms",
    price: 11.99,
    image: "/risotto.jpg",
    category: "Italian",
    type: "Veg",
  },
  {
    id: 46,
    name: "Tiramisu",
    description: "Classic Italian dessert with mascarpone",
    price: 6.99,
    image: "/tiramisu.jpg",
    category: "Italian",
    type: "Veg",
  },
  {
    id: 47,
    name: "Classic Burger",
    description: "Juicy beef patty with cheese and sauce",
    price: 10.99,
    image: "/classic-burger.jpg",
    category: "American",
    type: "Non-Veg",
  },
  {
    id: 48,
    name: "BBQ Ribs",
    description: "Slow-cooked ribs with smoky barbecue sauce",
    price: 15.99,
    image: "/bbq-ribs.jpg",
    category: "American",
    type: "Non-Veg",
  },
  {
    id: 49,
    name: "Mac and Cheese",
    description: "Creamy pasta with melted cheddar cheese",
    price: 9.99,
    image: "/mac-cheese.jpg",
    category: "American",
    type: "Veg",
  },
  {
    id: 50,
    name: "Fried Chicken",
    description: "Crispy fried chicken with herbs",
    price: 11.99,
    image: "/fried-chicken.jpg",
    category: "American",
    type: "Non-Veg",
  },
  {
    id: 51,
    name: "Grilled Steak",
    description: "Tender steak cooked to perfection",
    price: 18.99,
    image: "/grilled-steak.jpg",
    category: "American",
    type: "Non-Veg",
  },
  {
    id: 52,
    name: "Mac and Cheese (Veg)",
    description: "Classic comfort food with truffle oil",
    price: 10.99,
    image: "/truffle-mac-cheese.jpg",
    category: "American",
    type: "Veg",
  },
  {
    id: 53,
    name: "Black Tea",
    description: "Premium black tea with aromatic spices",
    price: 2.99,
    image: "/black-tea.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 54,
    name: "Green Tea",
    description: "Fresh green tea with mint leaves",
    price: 2.99,
    image: "/green-tea.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 55,
    name: "Masala Tea",
    description: "Spiced tea blend with milk and cardamom",
    price: 3.49,
    image: "/masala-tea.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 56,
    name: "Cappuccino",
    description: "Creamy cappuccino with espresso and milk foam",
    price: 4.99,
    image: "/cappuccino.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 57,
    name: "Espresso",
    description: "Strong and bold espresso shot",
    price: 3.49,
    image: "/espresso.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 58,
    name: "Iced Coffee",
    description: "Chilled coffee with ice and milk",
    price: 4.49,
    image: "/iced-coffee.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 59,
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 4.99,
    image: "/orange-juice.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 60,
    name: "Mango Juice",
    description: "Refreshing mango juice with pulp",
    price: 4.49,
    image: "/mango-juice.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 61,
    name: "Mixed Fruit Juice",
    description: "Blend of seasonal fruits",
    price: 4.99,
    image: "/mixed-fruit-juice.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 62,
    name: "Watermelon Juice",
    description: "Refreshing watermelon juice",
    price: 4.49,
    image: "/watermelon-juice.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 63,
    name: "Boost Chocolate",
    description: "Nutritious Boost drink in chocolate flavor",
    price: 3.99,
    image: "/boost-chocolate.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 64,
    name: "Boost Vanilla",
    description: "Creamy Boost drink in vanilla flavor",
    price: 3.99,
    image: "/boost-vanilla.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 65,
    name: "Horlicks Chocolate",
    description: "Classic Horlicks with chocolate malt flavor",
    price: 3.49,
    image: "/horlicks-chocolate.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 66,
    name: "Horlicks Original",
    description: "Original Horlicks malted drink",
    price: 3.49,
    image: "/horlicks-original.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 67,
    name: "Horlicks Vanilla",
    description: "Smooth Horlicks with vanilla flavor",
    price: 3.49,
    image: "/horlicks-vanilla.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    id: 68,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with ganache",
    price: 5.99,
    image: "/chocolate-cake.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 69,
    name: "Cheesecake",
    description: "Creamy New York style cheesecake",
    price: 6.99,
    image: "/cheesecake.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 70,
    name: "Vanilla Ice Cream",
    description: "Classic vanilla ice cream with waffle cone",
    price: 4.99,
    image: "/vanilla-ice-cream.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 71,
    name: "Chocolate Brownies",
    description: "Fudgy chocolate brownies with nuts",
    price: 4.49,
    image: "/chocolate-brownies.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 72,
    name: "Gulab Jamun",
    description: "Soft milk solids fried and soaked in sugar syrup",
    price: 4.99,
    image: "/gulab-jamun.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 73,
    name: "Kheer",
    description: "Creamy rice pudding with cardamom and nuts",
    price: 4.49,
    image: "/kheer.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 74,
    name: "Rasgulla",
    description: "Spongy cottage cheese balls in sugar syrup",
    price: 4.99,
    image: "/rasgulla.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 75,
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake topped with fresh strawberries",
    price: 7.49,
    image: "/strawberry-cheesecake.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 76,
    name: "Chocolate Mousse",
    description: "Light and airy chocolate mousse with whipped cream",
    price: 5.49,
    image: "/chocolate-mousse.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 77,
    name: "Jalebi",
    description: "Crispy spirals of fried batter soaked in syrup",
    price: 3.99,
    image: "/jalebi.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 78,
    name: "Ice Cream Sundae",
    description: "Assorted ice cream with chocolate sauce and toppings",
    price: 6.99,
    image: "/ice-cream-sundae.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    id: 79,
    name: "Plain Idly",
    description: "Steamed rice cake served with sambar and coconut chutney",
    price: 4.99,
    image: "/plain-idly.jpg",
    category: "South Indian",
    type: "Veg",
  },
  {
    id: 80,
    name: "Idly Plate (3 pieces)",
    description: "Three soft idly with sambar, chutney, and pickle",
    price: 6.99,
    image: "/idly-plate.jpg",
    category: "South Indian",
    type: "Veg",
  },
  {
    id: 81,
    name: "Masala Dosa",
    description: "Crispy dosa filled with spiced potatoes and onions",
    price: 7.99,
    image: "/masala-dosa.jpg",
    category: "South Indian",
    type: "Veg",
  },
  {
    id: 82,
    name: "Plain Dosa",
    description: "Thin crispy crepe served with sambar and chutney",
    price: 6.99,
    image: "/plain-dosa.jpg",
    category: "South Indian",
    type: "Veg",
  },
  {
    id: 83,
    name: "Butter Masala Dosa",
    description: "Crispy dosa with spiced potato filling and butter",
    price: 8.99,
    image: "/butter-masala-dosa.jpg",
    category: "South Indian",
    type: "Veg",
  },
  {
    id: 84,
    name: "Cheese Dosa",
    description: "Crispy dosa with paneer and mozzarella cheese",
    price: 9.99,
    image: "/cheese-dosa.jpg",
    category: "South Indian",
    type: "Veg",
  },
  {
    id: 85,
    name: "Onion Dosa",
    description: "Crispy dosa filled with caramelized onions",
    price: 7.49,
    image: "/onion-dosa.jpg",
    category: "South Indian",
    type: "Veg",
  },
  {
    id: 86,
    name: "Spring Dosa",
    description: "Crispy dosa with vegetable stuffing and spring onions",
    price: 8.49,
    image: "/spring-dosa.jpg",
    category: "South Indian",
    type: "Veg",
  },
  {
    id: 87,
    name: "Chicken Dosa",
    description: "Crispy dosa with spiced minced chicken filling",
    price: 9.99,
    image: "/chicken-dosa.jpg",
    category: "South Indian",
    type: "Non-Veg",
  },
  {
    id: 88,
    name: "Egg Dosa",
    description: "Crispy dosa with scrambled eggs and onions",
    price: 7.99,
    image: "/egg-dosa.jpg",
    category: "South Indian",
    type: "Non-Veg",
  },
  {
    id: 89,
    name: "Sambar with Rice",
    description: "Aromatic lentil stew with vegetables served with rice",
    price: 6.99,
    image: "/sambar-rice.jpg",
    category: "South Indian",
    type: "Veg",
  },
  {
    id: 90,
    name: "Coconut Chutney",
    description: "Fresh coconut chutney with green chilies",
    price: 2.99,
    image: "/coconut-chutney.jpg",
    category: "South Indian",
    type: "Veg",
  },
]

export default function Home() {
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  useEffect(() => {
    const savedCart = localStorage.getItem("foodhub-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("foodhub-cart", JSON.stringify(cart))
  }, [cart])

  const categories = ["All", ...new Set(MENU_ITEMS.map((item) => item.category))]
  const foodTypes = ["All", ...new Set(MENU_ITEMS.map((item) => item.type))]

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesType = selectedType === "All" || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem,
        ),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cart.length} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FoodHub</h1>
          <p className="text-lg md:text-xl opacity-90">Order delicious food with just a few clicks</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border-b sticky top-16 z-20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Cart Button */}
            <a
              href="/cart"
              className="relative inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <ShoppingCart size={20} />
              <span>Cart ({cart.length})</span>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </a>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Food Type Filter */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {foodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedType === type ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Menu</h2>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  )
}
