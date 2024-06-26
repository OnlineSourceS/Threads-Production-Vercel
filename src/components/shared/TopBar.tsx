// "use client";
import Link from "next/link";
import Image from "next/image";

import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

function TopBar() {
  //localhost:3000/http://localhost:3000/
  return (
    <nav className="sticky top-0 z-20 text-white bg-[#121415] p-4 flex justify-between items-center">
      <Link href={"/"} className="flex gap-6 items-center">
        <Image src={"/2.png"} alt="LOGO" width={28} height={28} />
        <p className="font-bold text-2xl ">Threads</p>
      </Link>

      <div className="flex">
        <SignedIn>
          <div className="profileContainer flex gap-5  md:hidden">
            <SignOutButton
            // signOutCallback={() => {
            //   router.push("/sign-up");
            // }}
            >
              <div className="flex items-center cursor-pointer gap-3">
                <Image
                  src={"/assets/logout.svg"}
                  alt="logout"
                  width={25}
                  height={25}
                />
                <p>Logout</p>
              </div>
            </SignOutButton>
            {/* <UserButton afterSignOutUrl="/sign-in" /> */}
          </div>
        </SignedIn>
        <OrganizationSwitcher
          appearance={{
            elements: { organizationSwitcherTrigger: "py-2 px-4" },
          }}
        />
      </div>
    </nav>
  );
}

export default TopBar;
