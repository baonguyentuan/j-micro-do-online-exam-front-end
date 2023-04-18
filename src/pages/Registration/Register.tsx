import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/user/userSlice"
import './styles.css'

type Props = {}

export default function Register({}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const checkDisable = password == rePassword;
  console.log('checkDisable', checkDisable)
  const dispatch = useDispatch();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For mocking, you can replace with a successful API call
    dispatch(registerUser({ username, password, rePassword }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="container_form_login">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Free Registration</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md -space-y-px">
              <div>
                <p className="text-base text-slate-400 mb-1">
                  Email<span style={{ color: 'red' }}>*</span>
                </p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <p className="text-base text-slate-400 mb-1 mt-6">
                  Password<span style={{ color: 'red' }}>*</span>
                </p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <p className="text-base text-slate-400 mb-1 mt-6">
                  Re-peat Password<span style={{ color: 'red' }}>*</span>
                </p>
                <input
                  id="re_password"
                  name="re_password"
                  type="password"
                  autoComplete="current-password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div className="container_button">
              <button
                type="submit"
                className="w-2/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={checkDisable}
              >
                Sign up
              </button>
              <a
                href="/login"
                className="w-2/3 flex justify-center py-2 px-4 border text-sm text-neutral-400 font-medium rounded-md mt-5 hover:bg-violet-100 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-100"
              >
                I already have an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
