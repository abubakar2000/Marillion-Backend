import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-full bg-pink-300 flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            formData?.username === "admin" &&
            formData?.password === "admin"
          ) {
            console.log(formData);
            localStorage.setItem("token", "abcd1234");
            window.location.reload();
          } else {
            alert("Wrong Password");
          }
        }}
        className="xl:w-[60%] md:w-[75%] w-[95%] bg-white rounded-md p-3 flex flex-col gap-3"
      >
        <div className="text-3xl">Login</div>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          className="border p-2 rounded-md"
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="border p-2 rounded-md"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-pink-400 p-2 rounded-md text-white hover:bg-pink-600 active:scale-95 duration-300 transition-all"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
