import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const FertilizerForm = () =>{
    
        const [newFertilizer, update] = useState({
            name: ""
        })
    
        const navigate = useNavigate()
    
        const handleSaveButtonClick = (event) => {
            event.preventDefault()
    
            const fertilizerToSave = {
                name: newFertilizer.name,
            }
    
            return fetch('http://localhost:8088/fertilizers', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(fertilizerToSave)
            })
                .then(res => res.json())
                .then(() => {
                    navigate("/plants")
                })
        }
    
        
    
        return (
            <section className="font-['merienda'] text-[20px] text-[#23321C] h-screen bg-cover bg-[url('https://res.cloudinary.com/dggkcaqhs/image/upload/v1675544321/Capstone/Copy_of_homemade_1_uqgxou.png')]">
            <form className="flex-column p-10 min-h-full  ">
                <section className="bg-[#B8BBB5]/90 m-10 min-h-0%]">
                <div className="text-[65px] font-['akronim']">Add A New Fertilizer</div>
                <fieldset className="border-none">
                    <div className="max-w-[50%]  ">
                        <label htmlFor="name">Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px]"
                            placeholder="Name of New Fertilizer"
                            value={newFertilizer.name}
                            onChange={
                                (event) => {
                                    const copy = { ...newFertilizer }
                                    copy.name = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
            
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px] rounded p-2 mx-10 my-3">
                    Save New Fertilizer
                </button>
                </section>
            </form>
            </section>
        )
    }
    
   
