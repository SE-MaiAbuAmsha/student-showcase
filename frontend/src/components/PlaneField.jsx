import Plane from "./Plane.jsx";

const PLANES = [
  {
    id: 1,
    top: "10%",
    width: 110,
    color: "#FCF1D0",
    duration: 35,
    delay: 2,
    bobDuration: 4,
    x: 8,
    direction: "right",
  },
  {
    id: 2,
    top: "20%",
    width: 90,
    color: "#5b7489",
    duration: 42,
    delay: 15,
    bobDuration: 5,
    x: 70,
    direction: "left",
  },
  {
    id: 3,
    top: "32%",
    width: 150,
    color: "#9fdae6",
    duration: 30,
    delay: 8,
    bobDuration: 6,
    x: 40,
    direction: "right",
  },
  {
    id: 4,
    top: "46%",
    width: 120,
    color: "#B9C4F0",
    duration: 38,
    delay: 22,
    bobDuration: 4,
    x: 85,
    direction: "left",
  },
  {
    id: 5,
    top: "58%",
    width: 100,
    color: "#7b95e6",
    duration: 32,
    delay: 5,
    bobDuration: 5,
    x: 20,
    direction: "right",
  },
  {
    id: 6,
    top: "66%",
    width: 140,
    color: "#9CC3E6",
    duration: 45,
    delay: 28,
    bobDuration: 6,
    x: 55,
    direction: "left",
  },
  {
    id: 7,
    top: "16%",
    width: 85,
    color: "#B9C4F0",
    duration: 28,
    delay: 10,
    bobDuration: 3,
    x: 30,
    direction: "left",
  },
  {
    id: 8,
    top: "40%",
    width: 130,
    color: "#465f93",
    duration: 40,
    delay: 35,
    bobDuration: 5,
    x: 62,
    direction: "right",
  },
];

function PlaneField() {
  return (
    <div className="plane-field" aria-hidden="true">
      {PLANES.map((plane) => (
        <Plane key={plane.id} {...plane} />
      ))}
    </div>
  );
}

export default PlaneField;
