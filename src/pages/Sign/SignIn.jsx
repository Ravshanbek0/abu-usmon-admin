import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



function SignIn() {
    const navigate = useNavigate()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    function navigateLogin(e) {
        e.preventDefault()
        console.log(login,password);
        
        if (login == "admin" && password == "1234") {
            navigate(`/home`)
        }
    }
    return (
        <div>
            <div className="flex min-h-full flex-col justify-center items-center h-screen px-6 py-12 lg:px-8">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={navigateLogin} className="space-y-6" >
                        <div>
                            <label  className="block text-sm/6 font-medium text-gray-900">Login</label>
                            <div className="mt-2">
                                <input onChange={((e) => {
                                    setLogin(`${e.target.value}`)
                                })} type="text"  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label  className="block text-sm/6 font-medium text-gray-900">Password</label>

                            </div>
                            <div className="mt-2">
                                <input onChange={((e) => {
                                    setPassword(`${e.target.value}`)
                                })} type="number" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button onClick={navigateLogin} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default SignIn