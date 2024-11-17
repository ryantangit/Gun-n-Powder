import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="bg-gray-300 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <div className="p-2">
                <a href="/dashboard" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-black  md:dark:hover:text-white dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
              </div>
            </li>
            {/* <li>
               <div className="p-2">
                <a href="/ping" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-black  md:dark:hover:text-white dark:hover:text-white md:dark:hover:bg-transparent">Ping</a>
                { <Link to="/ping">Ping</Link> }
              </div> 
            </li>  */}
            <li>
              <div className="p-2">
                <a href="/scan" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-black  md:dark:hover:text-white dark:hover:text-white md:dark:hover:bg-transparent">Scan</a>
                {/* <Link to="/scan"> Scan </Link> */}
              </div>
            </li>
            <li>
              <div className="p-2">
                <a href="/logs" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-black  md:dark:hover:text-white dark:hover:text-white md:dark:hover:bg-transparent">Logs</a>
                {/* <Link to="/logs"> Logs </Link> */}
              </div>
            </li>
            <li>
              <div className="p-2">
                <a href="/logout" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-black  md:dark:hover:text-white dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
                {/* <Link to="/logout"> Logout </Link> */}
              </div>
            </li>
          </ul>
        </div>
      </div>


    </nav>
  );
}
