import { Outlet, Route, Routes } from "react-router-dom"
import { PlantDetail } from "../Plants/PlantDetail"
import { PlantDetailForm } from "../Plants/PlantDetailForm"
import { PlantForm } from "../Plants/PlantForm"
import { PlantList } from "../Plants/PlantList"
import { FertilizerForm } from "../Plants/FertilizerForm"
import { PlantTypeForm } from "../Plants/PlantTypeForm"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>

                <Route path="plants" element={<PlantList/>} />
				<Route path="plants/create" element={ <PlantForm /> } />
                <Route path="plants/:plantId/detail" element={<PlantDetail/>} />
                <Route path="plants/:plantId/addUpdate" element={ <PlantDetailForm/> } />
                <Route path="addFertilizer" element={ <FertilizerForm/> } />
                <Route path="addPlantType" element={ <PlantTypeForm/> } />

			</Route>
        </Routes>
    )
}