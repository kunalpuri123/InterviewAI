import { Hexagon, Github, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24 w-full bg-black-900 text-white">
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <a href="/" className="flex items-center gap-x-2" aria-label="PrepMate">
            <Hexagon className="h-10 w-10 text-white" />
            <span className="text-white">Prep</span>
            <i className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text animate-gradient-move">
              Mate
            </i>
          </a>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            <li>
              <a href="https://twitter.com" target="_blank" aria-label="Twitter" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700">
                <Twitter className="h-5 w-5 text-white" />
              </a>
            </li>
            <li>
              <a href="https://github.com/kunalpuri123/InterviewAI" target="_blank" aria-label="GitHub" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700">
                <Github className="h-5 w-5 text-white" />
              </a>
            </li>
          </ul>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {["Products", "About", "Blog", "Contact"].map((item, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a href={`/${item.toLowerCase()}`} className="text-sm text-gray-400 hover:text-white underline-offset-4 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {["Privacy", "Terms"].map((item, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a href={`/${item.toLowerCase()}`} className="text-sm text-gray-500 hover:text-white underline-offset-4 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-gray-500 lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div>© 2025 PrepMate</div>
            <div>All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
