import Link from "next/link";
import Image from "next/image";

import logo from "public/ultraship-logo.png";

export default function Navbar() {
  return (
    <nav className="mx-auto my-18 max-w-5xl bg-black/10 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center rounded-full">
      {/* <div className="text-2xl font-bold text-blue-600">UltraShip</div> */}
      <div className="h-10 w-auto">
        <Image
          src="/UltraShip-Logo-v2-1.png"
          alt="UltraShip"
          height={0}
          width={100}
          className="object-contain"
        />
      </div>

      <div className="space-x-6">
        <Link href="/" className="font-medium hover:text-blue-500 text-white">
          Home
        </Link>
        {/* <Link
          href="/employees"
          className="font-medium hover:text-blue-500 text-white"
        >
          Employees
        </Link> */}
        <Link
          href="/about"
          className="font-medium hover:text-blue-500 text-white"
        >
          About
        </Link>
      </div>
    </nav>
  );
}
