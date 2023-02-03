import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const PlantDetailForm = () => {
    const [newUpdate, update] = useState({
        plantId: 0,
        imageUrl: "",
        watered: false,
        fertilized: false,
        fertilizerId: 0,
        date: "",
        notes: ""
    })

    const [fertilizers, setFertilizers] = useState([])
    const { plantId } = useParams()
    const navigate = useNavigate()
    const [isWatered, setWatered] =useState(false)
    const [isFertilized, setFertilized] =useState(false)
    const [fertilizerType, setFertilizerType] = useState(0)

const waterChecked = () => {
    setWatered(!isWatered)
}

const fertilizerChecked = ()=>{
    setFertilized(!isFertilized)
}

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const eventToSave = {
            plantId: plantId,
            imageUrl: newUpdate.imageUrl,
            watered: isWatered,
            fertilized: isFertilized,
            fertilizerId: fertilizerType,
            date: new Date().toLocaleDateString(),
            notes: newUpdate.notes
        }

        return fetch('http://localhost:8088/plantEvents', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(eventToSave)
        })
            .then(res => res.json())
            .then(() => {
                navigate(`/plants/${plantId}/detail`)
            })
    }

    useEffect(() => {
        fetch('http://localhost:8088/fertilizers?_sort=name')
            .then(res => res.json())
            .then((typesArray) => {
                setFertilizers(typesArray)
            })
    }, [])




    return (
        <form className="newUpdateForm">
            <h2 className="newUpdateForm__title">What's Happening?</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="image.jpeg"
                        value={newUpdate.imageUrl}
                        onChange={
                            (event) => {
                                const copy = { ...newUpdate }
                                copy.imageUrl = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="watered"
                        className="watered-checkbox"
                        type="checkbox"
                        value={newUpdate.watered}
                        onChange={
                            () => {
                                waterChecked()
                            }}>
                        <input type="checkbox" />
                        Watered</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fertilized"
                        className="fertilized-checkbox"
                        type="checkbox"
                        value={newUpdate.fertilized}
                        onChange={
                            () => {
                                fertilizerChecked()
                            }}>
                        <input type="checkbox" />
                        Fertilized</label>
                </div>
            </fieldset>
            <fieldset>
                {  isFertilized?  <div className="form-group">
                    <label htmlFor="fertilizerId"
                        className="dropdown"
                        type="dropdown"
                    >Select Type:</label>
                    <select
                    onChange={
                        (event) => {
                          setFertilizerType(event.target.value)
                        }
                    }>
                        <option value={0}> Select A Fertilizer </option>
                        {fertilizers.map((type) => {
                            return (<option key={type.id}
                                className="form-control"
                                value={type.id}
                                 >
                                {type.name}
                            </option>
                            )
                        })}
                    </select>
                </div>
            : ''}

            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control"
                        value={newUpdate.notes}
                        onChange={
                            (event) => {
                                const copy = { ...newUpdate }
                                copy.notes = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Plant Update
            </button>
        </form>
    )
                    }
