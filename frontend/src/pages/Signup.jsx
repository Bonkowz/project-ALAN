import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Assuming you have an icon/logo for Project ALAN, replace with actual path
// import projectAlanIcon from "../assets/images/project-alan-icon.png";

// TODO: fix design of page

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
      .get('http://localhost:5000/user/get-all-customers')
      .then((res) => {
        console.log(res.data)
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 
    axios
      .post('http://localhost:5000/auth/register', { email, firstName, middleName, lastName, password })
      .then(() => {
        alert('Registration Successful')
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
        console.log('Unable to register user')
      });
  }

  return (
    // Use a similar background color and center the content as per the image
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FEFAE0] text-gray-800 px-4">
      {/* Container for the sign-up form - Adjusted styling to match image */}
      <div className="bg-white p-8 rounded-[25px] shadow-md w-full max-w-sm">
        {/* Project ALAN Logo/Icon and text - Styled to match the image */}
        <div className="flex items-center mb-6">
          {/* Icon placeholder - replace with your actual icon component or tag */}
          {/* This div mimics the icon's appearance */}
          <div className="w-8 h-8 bg-[#606C38] rounded-full mr-2 flex items-center justify-center text-[#FEFAE0] text-sm font-bold"> {/* Placeholder for icon */}
            {/* You could add an SVG or image here */}🌱
          </div>
          <p className="font-serif text-lg text-[#606C38]">Project <i>ALAN</i></p>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-gray-800">Sign up</h1>
        <p className="text-gray-600 mb-6">Create an account.</p>

        <div>
          <form onSubmit={handleSubmit}>
            {/* firstName */}
            <div className="mb-4 flex items-center border border-gray-300 rounded-md bg-gray-200 px-3">
              <span className="mr-2 text-gray-500">👤</span>
              <input
                type="text"
                placeholder="enter firstName"
                className="w-full py-2 bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            {/* middleName */}
            <div className="mb-4 flex items-center border border-gray-300 rounded-md bg-gray-200 px-3">
              <span className="mr-2 text-gray-500">👤</span>
              <input
                type="text"
                placeholder="enter middleName"
                className="w-full py-2 bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                required
              />
              {/* lastName */}
            </div>
            <div className="mb-4 flex items-center border border-gray-300 rounded-md bg-gray-200 px-3">
              <span className="mr-2 text-gray-500">👤</span>
              <input
                type="text"
                placeholder="enter lastName"
                className="w-full py-2 bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                  required
              />
            </div>
            {/* Email Input with Icon - Styled to match the image */}
            <div className="mb-4 flex items-center border border-gray-300 rounded-md bg-gray-200 px-3">
              {/* Icon placeholder for email */}
              <span className="mr-2 text-gray-500">👤</span> {/* Placeholder icon */}
              <input
                type="email"
                placeholder="enter email"
                className="w-full py-2 bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Password Input with Icon - Styled to match the image */}
            <div className="mb-4 flex items-center border border-gray-300 rounded-md bg-gray-200 px-3">
              {/* Icon placeholder for password */}
              <span className="mr-2 text-gray-500">🔒</span> {/* Placeholder icon */}
              <input
                type="password"
                placeholder="enter password"
                className="w-full py-2 bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // NOTE: 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit
                pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$'
                required
              />
            </div>
            {/* Sign Up Button - Styled to match the image */}
            <button
              className="w-full bg-[#BC6C25] text-[#FEFAE0] py-2 rounded-md hover:bg-[#d89d61] transition duration-200 font-bold text-lg"
              // onClick={() => {handleSubmit()}} 
              type='submit'
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;