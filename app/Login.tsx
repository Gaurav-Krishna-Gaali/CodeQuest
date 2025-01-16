import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase/supabase";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Login = () => {
  const [user, setUser] = useState<User | null>(null); // Define user state with Supabase User type
  // const router = useRouter();
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  const logintoDB = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          username: user.user_metadata.full_name || user.email,
          profile_pic: user?.user_metadata?.avatar_url,
          provider: "google",
          provider_id: user.id,
        }),
      });
      if (!response.ok) {
        console.error("Error saving user data:", await response.text());
      } else {
        console.log("User logged in and data saved successfully");
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchUser();
    logintoDB();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setUser(null);
      // router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center ">
      {!user ? (
        <Button
          onClick={signInWithGoogle}
          className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-zinc-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
        >
          <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-zinc-600 group-hover:h-full"></span>
          <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
            Login
          </span>
        </Button>
      ) : (
        <div className="flex items-center gap-4">
          <Avatar className="outline outline-offset-2 outline-4 outline-zinc-800">
            <AvatarImage
              src={user?.user_metadata?.avatar_url || ""}
              alt="User Avatar"
            />
            <AvatarFallback>
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
