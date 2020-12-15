import pic from "./assets/Images/shoe1.jpg";
import julia from "./assets/Images/julia.jpg";
import timmy from "./assets/Images/bild8.jpg";

export const shoes = [
  {
    type: "Shoe 1",
    price: 400,
    description: "Description",
    img: pic,
  },
  {
    type: "Shoe 2",
    price: 300,
    description: "Description",
    img: pic,
  },
  {
    type: "Shoe 3",
    price: 100,
    description: "Description",
    img: pic,
  },
  {
    type: "Shoe 4",
    price: 500,
    description: "Description",
    img: pic,
  },
  {
    type: "Shoe 5",
    price: 1200,
    description: "Description",
    img: pic,
  },
  {
    type: "Shoe 6",
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
    title: "Forging",
    headerTitles: [
      "Competitor",
      "Forging",
      "Measurements",
      "Nailplacement/ Fit",
      "Flat / Finish",
      "Total Points",
    ],
    description: "Two shoes after referres description",
  },
  {
    type: "Shoeing",
    title: "Shoeing",
    headerTitles: [
      "Competitor",
      "Shoe Fit",
      "Trimming/ Balance",
      "Shoe",
      "Nailing and Finish",
      "Total Points",
    ],
    description: "Two shoes to foot",
  },
  {
    type: "ComboClass",
    title: "Combination class",
    headerTitles: [
      "Competitor",
      "Shoe Fit",
      "Trimming/Balance",
      "Shoe",
      "Nailing and Finish",
      "Total Points",
    ],
    description: "One shoe for foot and one to forge",
  },
  {
    type: "SpeedForging",
    title: "Speed Forging",
    headerTitles: [
      "Competitor",
      "Forging",
      "Measurements",
      "Nailplacement/ Fit",
      "Flat / Finish",
      "Total Points",
    ],
    description: "One shoe for foot and one to forge on time",
  },
  {
    type: "EagleEye",
    title: "Eagle Eye",
    headerTitles: [
      "Competitor",
      "Forging",
      "Measurements",
      "Nailplacement/ Fit",
      "Flat / Finish",
      "Total Points",
    ],
    description:
      "One or two shoes that will be unknown until start time of class. Referee deciced which shoes",
  },

  {
    type: "Pairs",
    title: "Pairs",
    headerTitles: [
      "Competitor",
      "Forging",
      "Measurements",
      "Nailplacement/ Fit",
      "Flat / Finish",
      "Total Points",
    ],
    description: "Pair competition, two feet each",
  },

  {
    type: "Team",
    title: "Team",
    headerTitles: [
      "Competitor",
      "Forging",
      "Measurements",
      "Nailplacement/ Fit",
      "Flat / Finish",
      "Total Points",
    ],
    description:
      "Team competition , 4 men on each team and ech one take one foot",
  },
];
