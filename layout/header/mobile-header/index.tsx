import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";
import BurgerIcon from "@/svg/burger-icon.svg";
import Logo from "@/svg/logo.svg";
import { links } from "..";
import clsx from "clsx";
import { Link } from "@/utils/navigation";

import { EsraLink } from "@/components/ui";

export function MobileHeader() {
  return (
    <section className="lg:hidden ">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <BurgerIcon />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetDescription>
              <ul className="flex flex-col gap-6 justify-center my-10">
                {links.map((link) => (
                  <li
                    key={link.name}
                    className={clsx("text-primary-100", {
                      "font-bold": false,
                    })}
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <EsraLink
                  name={"Login"}
                  href="/"
                  className="bg-primary-100/30 text-primary-100"
                />
                <EsraLink
                  name={"Sign Up"}
                  href="/"
                  className="bg-primary-100 text-white"
                />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
}
