import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {
    const [email, set] = useState("mia@pfq.com")
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("plant_user", JSON.stringify({
                        id: user.id,
                        name: user.name
                    }))
                    window.alert(`Welcome ${user.name}`)
                    navigate("/plants")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="grid content-center font-['merienda'] text-[25px] text-[#23321C] h-screen grow px-10 py-10 bg-center bg-cover bg-[url('https://res.cloudinary.com/dggkcaqhs/image/upload/v1675447051/Capstone/homemade_za9vbj.png')]">
            <section className="flex-column bg-[#B8BBB5]/75 min-h-[70%]">
                    <div className="text-center text-[100px] font-['akronim'] p-10 hover:uppercase">Welcome to The Jungle</div>
                <section className="grid justify-center">
                <form onSubmit={handleLogin}>
                    <h2 className="grid justify-center">Please sign in</h2>
                    <fieldset className="border-none">
                        <label htmlFor="inputEmail"> Email address: </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="w-40 font-['merienda'] text-[20px] hover:bg-[#E4B5A6]"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
    
                    <fieldset className="border-none grid justify-center">
                        <button  type="submit" className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px] rounded p-2 mt-5 mx-2">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            <div className="flex justify-center p-8">
                <Link to="/register">Not a member yet?</Link>
            </div>
            </section>
            </section>
        </main>
    )
}

