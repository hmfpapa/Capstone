import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const PlantForm = () => {
    const [newPlant, update] = useState({
        name: "",
        imageUrl: "",
        typeId: 0,
        acquired: "",
        userId: 0
    })

    const [types, setTypes] = useState([])

    const localPlantUser = localStorage.getItem("plant_user")
    const plantUser = JSON.parse(localPlantUser)
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const plantToSave = {
            name: newPlant.name,
            imageUrl: newPlant.imageUrl,
            typeId: newPlant.typeId,
            acquired: newPlant.acquired,
            userId: plantUser.id
        }

        return fetch('http://localhost:8088/plants', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(plantToSave)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/plants")
            })
    }

    useEffect(() => {
        fetch('http://localhost:8088/types?_sort=name')
            .then(res => res.json())
            .then((typesArray) => {
                setTypes(typesArray)
            })
    }, [])

    return (
        <form className="newPlantForm">
            <h2 className="newPlantForm__title">Add Your Newest Plant BB!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="New Plant's Name"
                        value={newPlant.name}
                        onChange={
                            (event) => {
                                const copy = { ...newPlant }
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="image.jpeg"
                        value={newPlant.imageUrl}
                        onChange={
                            (event) => {
                                const copy = { ...newPlant }
                                copy.imageUrl = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="typeId"
                        className="dropdown"
                        type="dropdown"
                    >Select Type:</label>
                    <select
                    onChange={
                        (event) => {
                            const copy = { ...newPlant }
                            copy.typeId = parseInt(event.target.value)
                            update(copy)
                        }
                    } >
                        {types.map((type) => {
                            return (<option 
                                key={type.id}
                                required autoFocus
                                className="form-control"
                                value={type.id}
                                >
                                {type.name}
                            </option>
                            )
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="acquired">Date Acquired:</label>
                    <input required autoFocus
                        type="date"
                        className="form-control"
                        value={newPlant.acquired}
                        onChange={
                            (event) => {
                                const copy = { ...newPlant }
                                copy.acquired = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save New Plant
            </button>
        </form>
    )
}
