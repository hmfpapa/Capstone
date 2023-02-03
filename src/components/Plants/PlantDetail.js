import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"


export const PlantDetail = () => {
    const { plantId } = useParams()
    const [plantDetails, setPlantDetail] = useState([])
    const [plants, setPlants] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/plants`)
                .then(res => res.json())
                .then((plants) => {
                    setPlants(plants)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/plantEvents?plantId=${plantId}&_expand=plant&_expand=fertilizer`)
                .then(res => res.json())
                .then((details) => {
                    setPlantDetail(details)
                })
        },
        [plantId]
    )

    const handleDeleteButtonClick = (event, detail) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/plantEvents/${detail.id}`, {
            method: "DELETE"
        })
        .then (res => res.json())
        .then (navigate(0))
    }

    const currentPlant = plants.find(plant => plant.id === plantId)

    return <>
        <header className="detail-header">{currentPlant?.name}</header>
        {plantDetails.map(detail =>


            <section className="m-3, border-dotted border-2 border-emerald-700 flex" key={detail.id}>
                <img className="max-w-sm h-auto p-3"
                    src={detail.imageUrl}
                    alt={detail?.plant?.name}
                />
                <section className="m-3">
                <div>Date: {(detail.date)}</div>
                <div>Watered? {detail.watered ? "✔️" : "❌"}</div>
                <div>Fertilized? {detail.fertilized ? "✔️" : "❌"}</div>
                <div>{detail.fertilized ? `Fertilizer: ${detail?.fertilizer?.name}` : ""}</div>
                <div>Notes: {detail.notes}</div>
<br/>
                <button className=""
                    onClick={(clickEvent) => handleDeleteButtonClick(clickEvent, detail)}
                    >Delete</button>

            </section>
            </section>
        )}
        <button className="m-3"
        onClick={(clickEvent) => {navigate(`/plants/${plantId}/addUpdate`)}}
        >Add an Update</button>
    </>
}

