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
        <section className="font-['merienda'] grid content-center  text-[20px] text-[#23321C] h-screen bg-cover bg-[url('https://res.cloudinary.com/dggkcaqhs/image/upload/v1675544321/Capstone/Copy_of_homemade_1_uqgxou.png')]">
        <div className=" ">
        <form className="  p-10 min-h-full  ">
            <section className="bg-[#B8BBB5]/90  m-10 min-h-0%]">
            <div className="text-[65px]  font-['akronim']">Add Your Newest Plant BB!</div>
            <fieldset className="border-none">
                <div className="max-w-[70%]  ">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px]"
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
            <fieldset className="border-none">
                <div className="max-w-[50%]">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input required autoFocus
                        type="text"
                        className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px]"
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
            <fieldset className="border-none">
                <div className="max-w-[50%] ">
                    <label htmlFor="typeId"
                        className="dropdown"
                        type="dropdown"
                    >Select Type:</label>
                    <select  className="font-['merienda'] hover:bg-[#E4B5A6] text-[15px]"
                    onChange={
                        (event) => {
                            const copy = { ...newPlant }
                            copy.typeId = parseInt(event.target.value)
                            update(copy)
                        }
                    } >
                        <option value={0}> Select A Type </option>
                        {types.map((type) => {
                            return (<option 
                                key={type.id}
                                required autoFocus
                               
                                value={type.id}
                                >
                                {type.name}
                            </option>
                            )
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset className="border-none">
                <div className="max-w-[50%]">
                    <label htmlFor="acquired">Date Acquired:</label>
                    <input required autoFocus
                        type="date"
                        className="hover:bg-[#E4B5A6]  font-['merienda'] text-[15px]"
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
                className="hover:bg-[#E4B5A6]  font-['merienda'] text-[15px] rounded p-2 mx-10 my-3">
                Save New Plant
            </button>
            </section>
        </form>
        </div>
        </section>
    )
}
