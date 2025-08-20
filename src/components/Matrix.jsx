import { useEffect } from "react";

export default function Matrix() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "matrix";
    Object.assign(canvas.style, {
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: "-1",
      width: "100%",
      height: "100%",
      opacity: "0.08",
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const cols = Math.floor(window.innerWidth / 20);
    const ypos = Array(cols).fill(0);

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#39FF14";
      ctx.font = "16px monospace";
      ypos.forEach((y, i) => {
        const text = String.fromCharCode(33 + Math.random() * 94);
        ctx.fillText(text, i * 20, y);
        ypos[i] = y > canvas.height + Math.random() * 10000 ? 0 : y + 20;
      });
    }
    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}
