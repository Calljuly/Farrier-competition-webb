import pic from "./assets/Images/shoe1.jpg";
import julia from "./assets/Images/julia.jpg";
import timmy from "./assets/Images/bild8.jpg";

export const shoes = [
  {
    title: "Shoe 1",
    price: 400,
    description: "Description",
    img: pic,
  },
  {
    title: "Shoe 2",
    price: 300,
    description: "Description",
    img: pic,
  },
  {
    title: "Shoe 3",
    price: 100,
    description: "Description",
    img: pic,
  },
  {
    title: "Shoe 4",
    price: 500,
    description: "Description",
    img: pic,
  },
  {
    title: "Shoe 5",
    price: 1200,
    description: "Description",
    img: pic,
  },
  {
    title: "Shoe 6",
    price: 400,
    description: "Description",
    img: pic,
  },
];

export const users = [
  {
    name: "Timmy Hoas",
    age: 1993,
    live: "Gothenburg",
    img: timmy,
    admin: true,
    results: [
      {
        competition: "Nordiska",
        points: 170,
        placing: 3,
      },
      {
        competition: "Svenska",
        points: 150,
        placing: 1,
      },
    ],
  },
  {
    name: "Julia Call",
    age: 1992,
    live: "Gothenburg",
    img: julia,
    results: [],
  },
];
export const compClasses = [
  {
    type: "Forging",
    title: "forging",
    headerTitles: [
      "Competitor",
      "Forging",
      "Measurements",
      "Nailplacement/ Fit",
      "Flat / Finish",
      "Total Points",
    ],
    description: "Information",
  },
  {
    type: "Shoeing",
    title: "shoeing",
    headerTitles: [
      "Competitor",
      "Shoe Fit",
      "Trimming/Balance",
      "Shoe",
      "Nailing and Finish",
      "Total Points",
    ],
    description: "Information",
  },
];
export const result = {
  result: [
    {
      id: 0,
      competitor: "Timmy Hoas",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
    {
      id: 1,
      competitor: "Julia Call",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
    {
      id: 2,
      competitor: "Simon Bodner",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
    {
      id: 3,
      competitor: "Per Nilsson",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
    {
      id: 4,
      competitor: "Sara ",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
    {
      id: 5,
      competitor: "Fredrik Strange",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
    {
      id: 6,
      competitor: "Louise Sjöstrand",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
    {
      id: 7,
      competitor: "Rickar Svärd",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
    {
      id: 8,
      competitor: "Rickard Roos",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
    {
      id: 9,
      competitor: "Daniel Sahl",
      one: "",
      two: "",
      three: "",
      four: "",
      total: "",
    },
  ],
  saved: false,
};
export const numbersToMultiply = 
[  {
    id:0,

  }]
