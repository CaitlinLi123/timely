import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authApi } from "../axios";

export default function ResetPwdPage() {
  const [searchParams] = useSearchParams();
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await authApi.get(`/validate-recovery-path?token=${token}`);
        if (res.status === 200) {
          setIsValid(true);
          setEmail(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      validateToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleSubmit = async () => {
    const res = await authApi.post(
      "/reset-password",
      {
        email,
        password: newPassword,
      },
      { withCredentials: true }
    );
    if (res.status == 200) {
      alert("success");
      navigate("/login");
    } else {
      alert(res.data);
    }
  };

  return (
    <div>
      {loading && <p>Validating....</p>}
      {!loading &&
        (isValid ? (
          <div className="space-y-4 flex flex-col flex-grow justify-center items-center h-screen">
            <h1 className="text-3xl font-bold mb-2">Reset Your Password</h1>
            <p>Email: {email}</p>
            <input
              type="text"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
              placeholder="your new password"
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2"
              required
            />
            <button
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
              className="w-full font-bold text-white bg-red-400 p-3 rounded-lg hover:bg-red-600 transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        ) : (
          <p>The link is expired. Please try again.</p>
        ))}
    </div>
  );
}
