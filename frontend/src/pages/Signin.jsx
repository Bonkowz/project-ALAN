import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import logoImg from "../assets/images/logo_placeholder.png";
import signinHeaderImg from "../assets/images/signInHeader.jpg"; 

// TODO: fix design of page

const Signin = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:5000/user/get-all-customers')
      .then((res) => {
        console.log(res.data)
      });
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password })
      const token = response.data.token

      const loggedInUserType = response.data.userType;
      setEmail('')
      setPassword('')
      fetchUsers();
      localStorage.setItem('token', token)
      if (loggedInUserType === 'administrator') {
        navigate('/admin/dashboard');
      } else if (loggedInUserType === 'customer') {
        navigate('/products');
      } else {
        navigate('/');
      }
      window.location.reload();
    } catch (error) {
      console.log('Login Error', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFAE0] flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-[48px] flex flex-col items-center justify-center p-0 shadow-none border-0 min-h-[750px]">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
          {/* Header pill shape */}
          <div className="relative w-[calc(100%+140px)] h-56 rounded-[9999px] mt-10 overflow-hidden -mx-[70px]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={signinHeaderImg} 
                alt="Sign In Header" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Logo and Title */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <img src={logoImg} alt="Logo" className="w-40 h-40 object-contain drop-shadow-lg" />
            </div>
          </div>
          {/* Form Card */}
          <div className="w-full flex flex-col items-center justify-center px-8 py-10">
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-6 items-center justify-center">
              {/* Email Input */}
              <input
                type="text"
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
                required
              />
              {/* Login Button */}
              <button
                className="w-full bg-[#606C38] text-[#FEFAE0] py-3 rounded-[16px] text-xl font-bold font-serif hover:bg-[#7a8646] transition duration-200"
                type='submit'
              >
                log in
              </button>
            </form>
            {/* Sign Up Link */}
            <p className="text-center text-xl mt-10 font-serif text-[#38471C]">
              Don't have an account yet?{' '}
              <span
                className="text-[#BC6C25] hover:underline cursor-pointer font-semibold"
                onClick={() => handleNavigate('/signup')}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;