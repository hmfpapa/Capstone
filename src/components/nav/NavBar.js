import { Link, useNavigate } from "react-router-dom"

export const NavBar = () =>{
    const navigate = useNavigate()

    return (
        <section className="bg-[#23321C] text-[30px] border-double border-[#E4B5A6] border-y-8 font-bold  font-['merienda'] ">
            <div className="flex flex-row justify-evenly">
           <img className="p-3"
                    src={'https://res.cloudinary.com/dggkcaqhs/image/upload/c_scale,w_70/v1675455037/Capstone/Untitled_design_2_zxkpje.png'}
                    alt={'cute plant'}
                />
            <div className="grid  content-center">
                <Link className="text-[#B8BBB5] font-bold no-underline hover:text-[#E4B5A6]" to="/plants">My Plants</Link>
            </div>
            <div className="grid content-center">
                <Link className="text-[#B8BBB5] no-underline font-bold hover:text-[#E4B5A6]" to="/plants/create">Add a Plant</Link>
            </div>
          
            {
                localStorage.getItem("plant_user")
                    ? <div className="grid content-center">
                        <Link className="text-[#B8BBB5] no-underline hover:text-[#E4B5A6]" to="" onClick={() => {
                            localStorage.removeItem("plant_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </div>
                    : ""
            }
            <img className="p-3"
                    src={'https://res.cloudinary.com/dggkcaqhs/image/upload/c_scale,w_50/v1675454563/Capstone/Untitled_design_vvr962.png'}
                    alt={'cute plant'}
                />
                </div>
        </section>
    )}