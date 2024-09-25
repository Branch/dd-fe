import Image from "next/image";
const Header = () => {
  return (
    <header className="container">
      <nav>
        <div className="flex gap-2 items-end leading-4 text-sm  pt-4 pb-8 border-b-2 border-djungleBlack">
          <a href="/" className="mr-12">
            <Image
              src={"/assets/images/logo.png"}
              alt={""}
              width={100}
              height={10}
            />
          </a>
          <a href="/about">Om</a>
          <a href="/about">Om</a>
          <a href="/about">Om</a>
        </div>
      </nav>
    </header>
  );
};
export default Header;
