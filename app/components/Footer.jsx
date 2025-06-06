import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bottom-0 left-1/2 translate-x-[-50%] flex flex-wrap items-center justify-center font-light text-nowrap text-sm p-4 lg:p-8">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 font-display"
        href="https://manuel-gatchalian.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        NadaMart {new Date().getFullYear()} - All Rights Reserved
      </a>
    </footer>
  );
};

export default Footer;
