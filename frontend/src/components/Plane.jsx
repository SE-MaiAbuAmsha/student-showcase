import "./Plane.css";

function Plane() {
  return (
    <div className="plane">
      <svg viewBox="0 0 64 64" className="plane__svg">
        <polygon
          points="5,34 58,11 30,37"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="30,37 58,11 39,53"
          fill="currentColor"
          fillOpacity="0.7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon points="30,37 39,53 34,44" fill="#0D1C42" fillOpacity="0.25" />
      </svg>
    </div>
  );
}

export default Plane;
