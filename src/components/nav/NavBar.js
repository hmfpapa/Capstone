import { Link, useNavigate } from "react-router-dom"

export const NavBar = () =>{
    const navigate = useNavigate()

    return (
        <section className="bg-green-100 flex flex-row justify-evenly">
            <div className=" ">
                <Link className="navbar__link" to="/plants">My Plants</Link>
            </div>
            <div className="">
                <Link className="navbar__link" to="/plants/create">Add a Plant</Link>
            </div>
          
            {
                localStorage.getItem("plant_user")
                    ? <div className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("plant_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </div>
                    : ""
            }
        </section>
    )}