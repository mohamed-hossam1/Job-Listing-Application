import Image from "next/image";
import Link from "next/link";

import UserControl from "./UserControl";

export default function Navbar() {
  return (
    <div className="shadow-lg">
      <div className="flex max-w-[1600px] px-5 m-auto justify-between items-center gap-5">
        <Link href="/">
          <div className="relative w-[70px] h-[70px] transition-all duration-300">
            <Image
              src="/a2sv-logo.png"
              alt="Logo"
              fill
              sizes="70px"
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex">
          <UserControl />
        </div>
      </div>
    </div>
  );
}
