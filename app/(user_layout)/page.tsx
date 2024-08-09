"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCurrentUser, selectCurrentUser } from "../store/slices/userSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(()=>{
    dispatch(fetchCurrentUser())
  },[])

  useEffect(() => {
    if (!currentUser.user && currentUser.loading) {
      router.push("/login");
    }
  }, [currentUser.user, currentUser.loading]);

  return (
    <div
      className="container mx-auto py-8"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div>
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w">
              <h1 className="text-3xl font-bold">
                Your Path to Senior Developer and Beyond
              </h1>
              <p className="py-6"></p>
              <Link href="/courses" className="btn btn-active btn-primary">
                Browse Our Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/frontend">
          <div className="bg-base-100 border border-base-200 p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-base-200">
            <h2 className="text-xl font-bold mb-4">Frontend</h2>
            <p>Click and take the front end test</p>
          </div>
        </Link>
        <Link href="/backend">
          <div className="bg-base-100 border border-base-200 p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-base-200">
            <h2 className="text-xl font-bold mb-4">Backend</h2>
            <p>Click and take the back end test</p>
          </div>
        </Link>
        <Link href="/fullstack">
          <div className="bg-base-100 border border-base-200 p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-base-200">
            <h2 className="text-xl font-bold mb-4">Full-stack</h2>
            <p>Click and take the full-stack test</p>
          </div>
        </Link>
      </div> */}
      {/* <Button /> */}
    </div>
  );
}
