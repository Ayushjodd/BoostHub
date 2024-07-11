import { useCallback, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/utils/conf";


interface InputBoxProps {
  title: string;
  label1: string;
  label2: string;
  label3?: string;
  label4?: string;
  warning: string;
  warningopt: string;
  type: string;
}

export default function InputBox({
  title,
  label1,
  label2,
  label3,
  label4,
  warning,
  warningopt,
  type,
}: InputBoxProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignin = useCallback(async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/bh/v1/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);

  const handleSignup = useCallback(async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/bh/v1/user/signup`,
        {
          email,
          password,
          name,
          role,
        },
        {
          withCredentials: true,
        }
      );
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  }, [email, password, name, role]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((showPassword) => !showPassword);
  }, []);
  return type === "signin" ? (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-8 w-80 md:w-96 mb-10">
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="text-purple-500 text-center text-xl font-semibold"
          >
            {title}
          </label>
          <label
            htmlFor="email"
            className="pt-4 pl-4 text-gray-700 dark:text-gray-300"
          >
            {label1}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jimmy@gmail.com"
            className="mt-2 p-2 mx-4 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
          />
          <label
            htmlFor="password"
            className="pt-4 pl-4 text-gray-700 dark:text-gray-300"
          >
            {label2}
          </label>
          <div className="relative mt-2 mx-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="jimmy678"
              className="p-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 dark:text-gray-300"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            className="py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-700 transition duration-300"
            content="Login"
            onClick={handleSignin}
          />
        </div>
        <div className="dark:text-white font-semibold text-center mt-3">
          {warning}{" "}
          <span className="text-violet-500 cursor-pointer" onClick={()=>{
            router.push('/signup')
          }}>{warningopt}</span>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-8 w-80 md:w-96">
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="text-purple-500 text-center text-xl font-semibold"
          >
            {title}
          </label>
          <label
            htmlFor="email"
            className="pt-4 pl-4 text-gray-700 dark:text-gray-300"
          >
            {label1}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jimmy@gmail.com"
            className="mt-2 p-2 mx-4 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
          />
          <label
            htmlFor="password"
            className="pt-4 pl-4 text-gray-700 dark:text-gray-300"
          >
            {label2}
          </label>
          <div className="relative mt-2 mx-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="jimmy678"
              className="p-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 dark:text-gray-300"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <div className="relative mt-2 mx-4">
            <label htmlFor="name">{label3}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="James Taylor"
              className="p-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <div className="relative mt-2 mx-4">
            <label htmlFor="role">{label4}</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
            >
              <option value="student">Student</option>
              <option value="creator">Creator</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            className="py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-700 transition duration-300"
            content="Signup"
            onClick={handleSignup}
          />
        </div>
        <div className="dark:text-white font-semibold text-center mt-3">
          {warning}{" "}
          <span className="text-violet-500 cursor-pointer" onClick={()=>{
            router.push('/login')
          }}>{warningopt}</span>
        </div>
      </div>
    </>
  );
}