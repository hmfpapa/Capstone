import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const PlantList = () => {
    const [plants, setPlants] = useState([])
    const [myPlants, setMyPlants] = useState([])

    const localPlantUser = localStorage.getItem("plant_user")
    const plantUser = JSON.parse(localPlantUser)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8088/plants?&_expand=user&_expand=type')
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

    return (<>
        {<>
            <h2>My Plants</h2>
            <article className="Plants">
                {
                    myPlants.map(plant => {
                        return <section key={plant.id} className="m-3, border-dotted border-2 border-emerald-700 flex">
                                <img className="max-w-sm h-auto p-3"
                                    src={plant.imageUrl}
                                    alt={plant.name}
                                />
                            <section>
                            <div className="m-3">Name: {plant.name} <br />
                                Type: {plant?.type?.name} <br />
                                Date Acquired: {(plant.acquired)}<br />
                                <button onClick={() => navigate(`/plants/${plant.id}/detail`)}>View Details</button><br/>
                            </div>
                            </section>
                        </section>
                    })
                }
            </article>
        </>
        }
    </>)
}