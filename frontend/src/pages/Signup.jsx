import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImg from "../assets/images/logo_placeholder2.jpg";

const Signup = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  // NOTE: declare useStates 
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/get-all-customers`)
      .then((res) => {
        console.log(res.data)
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/register`, { email, firstName, middleName, lastName, password })
      .then(() => {
        // alert('Registration Successful')
        // resets fields
        setEmail('')
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setPassword('')
        fetchUsers();
        // redirects to login page
        navigate('/signin')
      })
      .catch((error) => {
        alert('Unable to register user')
        console.log('Unable to register user')
        toast.error("Unable to register user.");
      });
  }

  return (
    <div className="min-h-screen bg-[#FEFAE0] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-[48px] flex flex-col p-8 shadow-none border-0 min-h-[750px] relative">
        {/* Logo at top left */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <img
            src={logoImg}
            alt="Logo"
            className="w-25 h-25 object-contain"
          />
        </div>

        {/* Split content into two columns - Increased margin-top */}
        <div className="w-full h-full flex items-center justify-between mt-48 px-16"> {/* Changed mt-32 to mt-48 */}
          {/* Left side - Header */}
          <div className="flex-1 flex flex-col items-start justify-center">
            <div className="w-full max-w-md">
              <h1 className="text-5xl font-serif font-bold text-[#38471C] mb-4">Sign up</h1>
              <p className="text-[#606C38] text-xl">Create an account.</p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit} className="space-y-6"> {/* Changed from space-y-4 to match spacing */}
                {/* Name Fields Row */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="first name"
                      className="w-full px-5 py-3 border-2 border-[#606C38] rounded-[16px] bg-[#E9EDC9] text-lg font-serif focus:outline-none focus:ring-2 focus:ring-[#606C38]"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="last name"
                      className="w-full px-5 py-3 border-2 border-[#606C38] rounded-[16px] bg-[#E9EDC9] text-lg font-serif focus:outline-none focus:ring-2 focus:ring-[#606C38]"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <input
                  type="email"
                  placeholder="enter email"
                  className="w-full px-5 py-3 border-2 border-[#606C38] rounded-[16px] bg-[#E9EDC9] text-lg font-serif focus:outline-none focus:ring-2 focus:ring-[#606C38]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* Password Input */}
                <input
                  type="password"
                  placeholder="enter password"
                  className="w-full px-5 py-3 border-2 border-[#606C38] rounded-[16px] bg-[#E9EDC9] text-lg font-serif focus:outline-none focus:ring-2 focus:ring-[#606C38]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$"
                  required
                />

                {/* Sign Up Button - Removed mt-6 since spacing is handled by form's space-y-6 */}
                <button
                  type="submit"
                  className="w-full bg-[#BC6C25] text-[#FEFAE0] py-3 rounded-2xl text-xl font-bold hover:bg-[#d89d61] transition duration-200"
                >
                  sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;