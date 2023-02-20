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
            fertilizerId: (isFertilized? fertilizerType: "0"),
            date: new Date().toLocaleDateString(),
            notes: (newUpdate.notes? newUpdate.notes : "")
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
    <section className="h-screen  bg-cover bg-center font-['merienda'] text-[20px] text-[#23321C] bg-[url('https://res.cloudinary.com/dggkcaqhs/image/upload/v1675544321/Capstone/Copy_of_homemade_1_uqgxou.png')]">
       <section className=" p-10  ">
        <form className="bg-[#B8BBB5]/75 m-10">
            <div className="text-[65px] font-['akronim']">What's Happening?</div>
            <fieldset className="border-none ">
                <div className="">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input required autoFocus
                        type="text"
                        className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px]"
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
            </fieldset >
            <fieldset className="border-none">
                <div className="">
                    <label htmlFor="watered"
                        className=""
                        type="checkbox"
                        value={newUpdate.watered}
                        onChange={
                            () => {
                                waterChecked()
                            }}>
                        <input type="checkbox" className="checked:[#E4B5A6]"  />
                        Watered</label>
                </div>
            </fieldset>
            <fieldset className="border-none">
                <div className="">
                    <label htmlFor="fertilized"
                        className=""
                        type="checkbox"
                        value={newUpdate.fertilized}
                        onChange={
                            () => {
                                fertilizerChecked()
                            }}>
                        <input type="checkbox" className="checked:bg-[#E4B5A6]" />
                        Fertilized</label>
                </div>
            </fieldset>
            <fieldset className="border-none">
                {  isFertilized?  <div className="form-group">
                    <label htmlFor="fertilizerId"
                        className="dropdown "
                        type="dropdown"
                    >Select Type:</label>
                    <select className="font-['merienda'] hover:bg-[#E4B5A6] text-[15px] "
                    onChange={
                        (event) => {
                          setFertilizerType(event.target.value)
                        }
                    }>
                        <option value={0} > Select A Fertilizer </option>
                        {fertilizers.map((type) => {
                            return (<option key={type.id}
                                
                                value={type.id}
                                 >
                                {type.name}
                            </option>
                            )
                        })}
                    </select>
                    <button
                onClick={() => navigate(`/addFertilizer`)}
                className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px] rounded p-1 my-2 mx-10" >
                Add a Fertilizer
            </button>
                </div>
            : ''}

            </fieldset>
            <fieldset className="border-none">
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <input required autoFocus
                        type="text"
                        className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px]"
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
                className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px] rounded p-2 my-5 mx-10" >
                Save Plant Update
            </button>
        </form>
        </section>
        </section>
    )
                    }
