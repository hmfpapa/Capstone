import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Register = (props) =>{ 
    const [user, setUser] = useState({
        email: "",
        name: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("plant_user", JSON.stringify({
                        id: createdUser.id,
                        name: createdUser.name
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }} className="grid content-center font-['merienda'] text-[25px] h-screen bg-cover bg-center bg-[url('https://res.cloudinary.com/dggkcaqhs/image/upload/v1675447051/Capstone/homemade_za9vbj.png')]">
            <section className="bg-[#B8BBB5]/75  min-h-[70%]">
            <form className="p-8" onSubmit={handleRegister}>
                <div className="text-[85px] font-['akronim']">Please Register For Your Plant Page</div>
                <fieldset className="border-none">
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateUser}
                    className="hover:bg-[#E4B5A6] font-['merienda'] text-[20px]"
                           type="text" id="name" 
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset className="border-none">
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="hover:bg-[#E4B5A6] font-['merienda'] text-[20px]"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset className="border-none ">
                    <button type="submit" className="hover:bg-[#E4B5A6] font-['merienda'] text-[15px] rounded p-2 mt-5 mx-2"> Register </button>
                </fieldset>
            </form>
            </section>
        </main>
    )
}