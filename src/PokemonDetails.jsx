import React from "react"
import Spinner from "./Spinner"

export default function PokemonDetails({ pokemonData, isDataUpdating }) {
  return (
    <>
      <div className="InlineContent">
        <p>Pokemon Name: {pokemonData.read().name}</p>
        {isDataUpdating && <Spinner />}
      </div>
    </>
  )
}
