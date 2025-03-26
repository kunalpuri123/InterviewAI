"use client"
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();


  return (
    <nav className="bg-[#0F0F0F] shadow-[0px_2px_17.7px_0px_#2F2F7E] w-full h-[80px] flex items-center justify-between px-4 md:px-10">
      {/* Left - Back Button */}
      <button
        onClick={() => router.back()}
        className="text-white font-bold text-base md:text-lg hover:text-gray-400 transition"
      >
        ⬅
      </button>

      {/* Middle - Logo */}
      <div className="flex items-center justify-center mx-auto">
        <h1
          className="text-2xl md:text-4xl font-normal leading-[47.52px] text-left group hover:scale-105 transition-all duration-500"
          style={{
            fontFamily: "Nasalization, sans-serif",
            letterSpacing: "-0.05em",
          }}
        >
          <span className="text-white">Prep</span>
          <i
            className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text animate-gradient-move"
            style={{ display: "inline-block" }}
          >
            Mate
          </i>
        </h1>
      </div>

      {/* Right - Empty Space */}
      <div className="flex justify-end w-[140px]"></div>
    </nav>
  );
};



export default function Page() {
  return (
    <>
      <Navbar />
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <span className="text-white">Prep</span>
              <i
                className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text animate-gradient-move"
                style={{ display: "inline-block" }}
              >
                Mate
              </i>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to PrepMate! 🦑
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Your Preparation begins here!
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <SignIn />
            </div>
          </main>
        </div>
      </section>
    </>
  );
}