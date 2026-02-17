import { useState, useEffect } from "react"
interface Props {
    id: number
}

interface Pokemon {
    id: number,
    name: string,
    inmageUrl: string,
}



export const usePokemon = ({ id }: Props) => {

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getPokemonByid = async (id: number) => {
            setIsLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();

            setPokemon({
                id: id,
                name: data.name,
                inmageUrl: data.url
            });
            setIsLoading(false);
        }

        getPokemonByid(id);
    }, [id])


    return {
        //properties
        isLoading,
        pokemon,
        formattedId: id.toString().padStart(3, '0'),
    }
}


