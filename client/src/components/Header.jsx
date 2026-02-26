import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Header = () => {
    const {backendUrl, isLoggedIn, userData} = useContext(AppContext)

    const navigate = useNavigate()

    const handleVerify = async () => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/user/send-verification-otp`)
            if (data.success) {
                sessionStorage.setItem('prevPage', '/my-tasks')
                navigate('/email-verify')
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
            <img src={assets.header_img} alt='' className='w-36 h-36 rounded-full mb-6'/>
            <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
                Hello{userData ? ' ' + userData.name : ''}!
                <img src={assets.hand_wave} alt='' className='w-8 aspect-square'/>
            </h1>
            <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
                Welcome
            </h2>
            {
                isLoggedIn
                ? (
                    !userData?.isAccountVerified && (
                        <h1 className='text-2xl text-center font-semibold'>
                            Your account is not verified. Please <span className='cursor-pointer underline' onClick={handleVerify}>verify</span> it to create tasks.
                        </h1>
                    )
                ) : (
                    <h1 className='text-2xl text-center font-semibold'>
                        You are not logged in. Please <span className='cursor-pointer underline' onClick={() => navigate('/login')}>login</span> it to create tasks.
                    </h1>
                )
            }
        </div>
    )
}

export default Header