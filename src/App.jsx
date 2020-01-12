import "./styles.css"
import React, {
  lazy,
  Suspense,
  useState,
  useTransition,
  useDeferredValue
} from "react"
import { getPokemonById } from "./pokemonApi"
import suspensify from "./suspensify"
import Error from "./Error"

const PokemonDetails = lazy(() => import("./PokemonDetails"))
const initialPokemonData = suspensify(getPokemonById(1))

export default function App() {
  const [pokemonData, setPokemonData] = useState(initialPokemonData)
  const [startTransition] = useTransition()
  const deferredPokemonData = useDeferredValue(pokemonData, { timeoutMs: 3000 })
  const isPokemonDataPending = deferredPokemonData !== pokemonData

  return (
    <Error>
      <div className="App">
        <h1>Pokemon Catalogue</h1>
        <Suspense fallback={<>Loading...</>}>
          <PokemonDetails
            pokemonData={deferredPokemonData}
            isDataUpdating={isPokemonDataPending}
          />
          <button
            type="button"
            onClick={() =>
              startTransition(() =>
                setPokemonData(
                  suspensify(getPokemonById(deferredPokemonData.read().id + 1))
                )
              )
            }
            disabled={isPokemonDataPending}
          >
            Next
          </button>
        </Suspense>
      </div>
    </Error>
  )
}
