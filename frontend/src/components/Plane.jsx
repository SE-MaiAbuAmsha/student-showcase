import "./Plane.css";

function Plane({
  top,
  width,
  color,
  duration,
  delay,
  bobDuration,
  x,
  direction = "right",
}) {
  const style = {
    top,
    width: `${width}px`,
    color,
    "--duration": `${duration}s`,
    "--delay": `-${delay}s`,
    "--bob": `${bobDuration}s`,
    "--x": `${x}%`,
  };

  return (
    // هنا ضفنا الكلاس الجديد plane__path
    <div className={`plane__path plane__path--${direction}`} style={style}>
      <div className="plane">
        <div className="plane__flip">
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
            <polygon
              points="30,37 39,53 34,44"
              fill="#0D1C42"
              fillOpacity="0.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Plane;
