import "./styles.css"
import React, {
  lazy,
  Suspense,
  SuspenseList,
  useState,
  useTransition,
  useDeferredValue
} from "react"
import { getPokemonById, getPokemonCollection } from "./pokemonApi"
import suspensify from "./suspensify"
import Error from "./Error"
import PokemonCollection from "./PokemonCollection"

const PokemonDetails = lazy(() => import("./PokemonDetails"))
const initialPokemonData = suspensify(getPokemonById(1))
const pokemonCollectionData = suspensify(getPokemonCollection())

export default function App() {
  const [pokemonData, setPokemonData] = useState(initialPokemonData)
  const [startTransition] = useTransition()
  const deferredPokemonData = useDeferredValue(pokemonData, { timeoutMs: 3000 })
  const isPokemonDataPending = deferredPokemonData !== pokemonData

  return (
    <div className="App">
      <h1>Pokemon Catalogue</h1>
      <SuspenseList revealOrder="togetheer">
        <Suspense fallback={<>Loading...</>}>
          <Error>
            <PokemonDetails
              pokemonData={deferredPokemonData}
              isDataUpdating={isPokemonDataPending}
            />
            <button
              type="button"
              onClick={() =>
                startTransition(() =>
                  setPokemonData(
                    suspensify(
                      getPokemonById(deferredPokemonData.read().id + 1)
                    )
                  )
                )
              }
              disabled={isPokemonDataPending}
            >
              Next
            </button>
          </Error>
        </Suspense>

        <Suspense fallback={<>Loading...</>}>
          <Error>
            <PokemonCollection collectionData={pokemonCollectionData} />
          </Error>
        </Suspense>
      </SuspenseList>
    </div>
  )
}
