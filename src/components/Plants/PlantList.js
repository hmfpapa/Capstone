import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const PlantList = () => {
    const [plants, setPlants] = useState([])
    const [myPlants, setMyPlants] = useState([])
    const [types, setTypes] = useState([])
    const [filteredPlants, setFilteredPlants] = useState([])
    const [chosenType, setChosenType] = useState([])

    const localPlantUser = localStorage.getItem("plant_user")
    const plantUser = JSON.parse(localPlantUser)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8088/plants?_sort=acquired&_expand=user&_expand=type')
            .then(res => res.json())
            .then((plantArray) => {
                setPlants(plantArray)
            })
    }, [])

    useEffect(() => {
        const usersPlants = plants.filter(plant => {
            return plant.user.id === plantUser.id
        })
        setMyPlants(usersPlants)
    },
        [plants])

    useEffect(() => {
        fetch('http://localhost:8088/types?_sort=name')
            .then(res => res.json())
            .then((typeArray) => {
                setTypes(typeArray)
            })
    }, [])

    useEffect(() => {
        const filterPlants = myPlants.filter(plant => {
            return plant.typeId === parseInt(chosenType)
        })
        setFilteredPlants(filterPlants)
    },
        [chosenType])

    const handleDeleteButtonClick = (event, plant) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/plants/${plant.id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(navigate(0))
    }


    


    return (<>
        {<section className="font-['merienda'] text-[20px] text-[#23321C] bg-cover bg-[#B8BBB5]">
            <div className="bg-cover bg-[url('https://res.cloudinary.com/dggkcaqhs/image/upload/v1676916462/Capstone/homemade_2_ibggbz.png')]">
            <div className="text-[100px] font-['akronim'] p-10 text-center hover:uppercase"> Your Green Room</div>
            <div className="flex justify-center text-[25px] ">
            <label  
                        type="dropdown"
                    >Select a Plant Type to View:  </label>
                    <select className="font-['merienda'] text-[20px] hover:bg-[#E4B5A6]"
                    onChange={
                        (event) => {
                          setChosenType(event.target.value)
                        }
                    }
                   >
                        <option value={0}> Select A Type </option>
                        {types.map((type) => {
                            return (<option key={type.id}
                                value={type.id}
                                 >
                                {type.name}
                            </option>
                            )
                        })}
                    </select>
            </div>
            <div className="flex  justify-center">
            <button className=" hover:bg-[#E4B5A6] font-['merienda'] text-[20px] rounded p-2 mt-5 mx-2"
                                    onClick={() => setFilteredPlants(myPlants)}>View All</button>
            </div>
            </div>
            <div className=" min-h-screen">
                <div className="grid grid-cols-3">
                {
                    filteredPlants.map(plant => {
                        return <div key={plant.id} className="flex flex-row bg-[#A4A4A4] rounded border-solid m-3 border-2  border-[#23321C]">
                            <img className="w-60  border-double  border-1 rounded border-[#E4B5A6]/75 m-3"
                                src={plant.imageUrl}
                                alt={plant.name}
                            />

                            <div className="m-5 font-bold">Name: {plant.name} <br />
                                Type: {plant?.type?.name} <br />
                                Date Acquired: {(plant.acquired)}<br />

                                <button
                                    className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px] rounded p-2 mt-5 mx-2"
                                    onClick={() => navigate(`/plants/${plant.id}/detail`)}>🌿View Details🌿</button><br />
                                <button className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px] rounded px-11 py-2 m-2 "
                                    onClick={(clickEvent) => handleDeleteButtonClick(clickEvent, plant)}
                                >Delete</button>
                            </div>
                        </div>
                    })
                }
                </div>
            </div>
            <div className="flex justify-center">
            <button
                onClick={() => navigate(`/addPlantType`)}
                className="hover:bg-[#E4B5A6] font-['merienda'] text-[20px] rounded p-2 m-2 mx-10" >
                Add a Plant Type
            </button></div>
        </section>
        }
    </>)
}