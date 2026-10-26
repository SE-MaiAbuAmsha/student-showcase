import Plane from "./Plane.jsx";
const PLANES = [
  {
    id: 1,
    top: "10%",
    width: 110,
    color: "#FCF1D0",
    duration: 40,
    delay: 5,
    bobDuration: 5,
    x: 8,
    direction: "right",
  },
  {
    id: 2,
    top: "20%",
    width: 90,
    color: "#5b7489",
    duration: 46,
    delay: 26,
    bobDuration: 6,
    x: 70,
    direction: "left",
  },
  {
    id: 3,
    top: "32%",
    width: 150,
    color: "#9fdae6",
    duration: 54,
    delay: 14,
    bobDuration: 7,
    x: 40,
    direction: "right",
  },
  {
    id: 4,
    top: "46%",
    width: 120,
    color: "#B9C4F0",
    duration: 38,
    delay: 30,
    bobDuration: 5,
    x: 85,
    direction: "left",
  },
  {
    id: 5,
    top: "58%",
    width: 100,
    color: "#7b95e6",
    duration: 42,
    delay: 9,
    bobDuration: 6,
    x: 20,
    direction: "right",
  },
  {
    id: 6,
    top: "66%",
    width: 140,
    color: "#9CC3E6",
    duration: 50,
    delay: 38,
    bobDuration: 7,
    x: 55,
    direction: "left",
  },
  {
    id: 7,
    top: "16%",
    width: 85,
    color: "#B9C4F0",
    duration: 36,
    delay: 21,
    bobDuration: 4,
    x: 30,
    direction: "left",
  },
  {
    id: 8,
    top: "40%",
    width: 130,
    color: "#465f93",
    duration: 48,
    delay: 42,
    bobDuration: 6,
    x: 62,
    direction: "right",
  },
];

function PlaneField() {
  return (
    <>
      {PLANES.map((plane) => (
        <Plane key={plane.id} {...plane} />
      ))}
    </>
  );
}

export default PlaneField;
