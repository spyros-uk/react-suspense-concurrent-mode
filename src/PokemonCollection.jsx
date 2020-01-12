import React from "react"

export default function PokemonCollection({ collectionData }) {
  return <div>{collectionData.read().count}</div>
}
