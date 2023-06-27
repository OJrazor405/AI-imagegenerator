import Image from "next/image"
import Link from "next/link"

function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 z-50 shadow-md">
        {/* left */}
        <div className="flex space-x-2 items-center">
            <Image 
                src='https://egde.no/wp-content/uploads/2022/04/Egde-logo-clr-RGB.svg'
                alt='logo'
                height={30}
                width={80}
            />

            <div>
                <h1 className="font-bold">
                    <span className="text-blue-500">AI</span> Image Generator
                </h1>
                <h2 className="text-xs">Powered by DALL-E 2, Chat GPT & Microsoft Azure!</h2>
            </div>
        </div>

        {/* right */}
        <div className="flex text-xs md:text-base divide-x items-center text-black">
            <Link 
                href='https://egde.no/'
                className="px-2 font-light text-right"
            >
                Egde.no
            </Link>
            <Link 
                href='https://www.papareact.com/microsoft-youtube-build'
                className="px-2 font-light text-right"
            >
                Github Repo
            </Link>
        </div>
    </header>
  )
}

export default Header