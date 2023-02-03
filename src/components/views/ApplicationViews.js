import { Outlet, Route, Routes } from "react-router-dom"
import { PlantDetail } from "../Plants/PlantDetail"
import { PlantDetailForm } from "../Plants/PlantDetailForm"
import { PlantForm } from "../Plants/PlantForm"
import { PlantList } from "../Plants/PlantList"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Your Plant Page</h1>
        

                    <Outlet />
                </>
            }>

                <Route path="plants" element={<PlantList/>} />
				<Route path="plants/create" element={ <PlantForm /> } />
                <Route path="plants/:plantId/detail" element={<PlantDetail/>} />
                <Route path="plants/:plantId/addUpdate" element={ <PlantDetailForm/> } />

			</Route>
        </Routes>
    )
}