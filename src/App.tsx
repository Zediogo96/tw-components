import SkewedInfiniteScroll from "./components/skewed-infinite-scroll";

// src/app.jsx
export default function App() {
  return (
    <div className="bg-slate-50 h-screen w-screen flex items-center justify-center px-16">
      <div className="relative w-full max-w-lg">
        <SkewedInfiniteScroll />
      </div>
    </div>
  )
}
