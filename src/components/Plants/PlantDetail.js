import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"



export const PlantDetail = () => {
    const { plantId } = useParams()
    const [plantDetails, setPlantDetail] = useState([])
    const navigate = useNavigate()

   

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
            .then(res => res.json())
            .then(navigate(0))
    }



    return <>
        <section className="font-['merienda'] text-[15px] bg-cover text-[#23321C] bg-[#B8BBB5]">
        <div className="pl-20 py-6 text-[20px] font-bold">
            <div className="flex">
                 <div> Plant Name: {plantDetails[0]?.plant?.name} <br/>
                 Date Acquired: {plantDetails[0]?.plant?.acquired}<br/>
                 
                </div> 
                
                <img
                className="w-60  border-double  border-1 rounded border-[#23321C]/75 ml-4"
                src={plantDetails[0]?.plant?.imageUrl}></img>
            </div>
            </div>

            <div className="min-h-screen">
                {plantDetails.map(detail =>


                    <section className=" flex flex-row mx-3 mb-3 rounded border-solid  border-2 bg-[#A4A4A4] border-[#23321C]" key={detail.id}>
                        <img className="w-60  border-double  border-1 rounded border-[#E4B5A6]/75 m-3"
                            src={detail.imageUrl}
                            alt={detail?.plant?.name}
                        />
                        <section className="m-3">
                            <div>Date: {(detail.date)}</div>
                            <div>Watered? {detail.watered ? "✔️" : "❌"}</div>
                            <div>Fertilized? {detail.fertilized ? "✔️" : "❌"}</div>
                            <div>{detail.fertilized ? `Fertilizer: ${detail?.fertilizer?.name}` : ""}</div>
                            <div>Notes: {detail.notes}</div>
                            <br />
                            <button className="hover:bg-[#E4B5A6] font-['merienda'] text-[12px] rounded p-2 mt-5 mx-2"
                                onClick={(clickEvent) => handleDeleteButtonClick(clickEvent, detail)}
                            >Delete</button>

                        </section>
                    </section>
                )}
                <div className="flex justify-center">
                    <button className="hover:bg-[#E4B5A6] font-['merienda'] text-[12px] rounded p-2 mt-5 mx-2"
                        onClick={() => { navigate(`/plants/${plantId}/addUpdate`) }}
                    >Add an Update</button>
                </div>
            </div>
        </section>
    </>
}

