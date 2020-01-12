import React, { useState, useTransition } from "react"
import { getPokemonById } from "./pokemonApi"
import suspensify from "./suspensify"

const initialPokemon = suspensify(getPokemonById(1))

export default function PokemonDetails() {
  // return new Error("Test Error")
  const [pokemonData, setPokemonData] = useState(initialPokemon)
  const [startTransition, isPendinig] = useTransition({ timeoutMs: 1000 })

  const pokemon = pokemonData.read()
  const onNext = () =>
    startTransition(() =>
      setPokemonData(suspensify(getPokemonById(pokemon.id + 1)))
    )

  return (
    <>
      <p>Pokemon Name: {pokemon.name}</p>
      <button type="button" onClick={onNext} disabled={isPendinig}>
        Next
      </button>
    </>
  )
}
