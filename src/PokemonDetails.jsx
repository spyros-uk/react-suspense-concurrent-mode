import React, { useState, useTransition } from "react"
import { getPokemonById } from "./pokemonApi"
import suspensify from "./suspensify"
import Spinner from "./Spinner"

const initialPokemon = suspensify(getPokemonById(1))

export default function PokemonDetails() {
  // return new Error("Test Error")
  const [pokemonData, setPokemonData] = useState(initialPokemon)
  const [startTransition, isPendinig] = useTransition({ timeoutMs: 3000 })

  const pokemon = pokemonData.read()
  const onNext = () =>
    startTransition(() =>
      setPokemonData(suspensify(getPokemonById(pokemon.id + 1)))
    )

  return (
    <>
      <div className="InlineContent">
        <p>Pokemon Name: {pokemon.name}</p>
        {isPendinig && <Spinner />}
      </div>
      <button type="button" onClick={onNext} disabled={isPendinig}>
        Next
      </button>
    </>
  )
}
