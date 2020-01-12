import "./styles.css"
import React, { lazy, Suspense } from "react"
import Error from "./Error"
const PokemonDetails = lazy(() => import("./PokemonDetails"))

export default function App() {
  return (
    <Error>
      <div className="App">
        <h1>Pokemon Catalogue</h1>
        <Suspense fallback={<>Loading...</>}>
          <PokemonDetails />
        </Suspense>
      </div>
    </Error>
  )
}
