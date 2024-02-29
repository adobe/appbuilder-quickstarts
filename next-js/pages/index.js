import Link from 'next/link'
import Image from "next/image"

export default function Page() {
  return (
    <main>
      <h1 className="text-4xl text-center mt-10">Welcome to Next.js on Adobe App Builder</h1>
      <p className="text-center text-xl mt-5 text-gray-700">A simple example of a Next.js app running on Adobe App Builder.</p>

      <div className="flex flex-wrap justify-center">

        <Link className="no-underline text-black visited:text-black" href={`${process.env.PATH_PREFIX}/use-middleware`}>
          <div className="cursor-pointer">
            <div className="m-8 max-w-xs rounded overflow-hidden shadow-lg">
              <Image unoptimized={true} src={'/routing-middleware.png'} alt={'Next.js middleware'} width={2560} height={1340} layout={"responsive"} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Middleware</div>
                <p className="text-gray-700 text-base">
                  This page is served with a middleware that sets a custom header.
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link className="no-underline text-black visited:text-black" href={`${process.env.PATH_PREFIX}/server-side-props`}>
          <div className="cursor-pointer">
            <div className="m-8 max-w-xs rounded overflow-hidden shadow-lg">
              <Image unoptimized={true} src={'/server-side-props.png'} alt={'Next.js server-side-props'} width={2560} height={1340} layout={"responsive"} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Server-Side Props</div>
                <p className="text-gray-700 text-base">
                  This page uses server-side props to display the current date and time.
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link className="no-underline text-black visited:text-black" href={`${process.env.PATH_PREFIX}/static-props`}>
          <div className="cursor-pointer">
            <div className="m-8 max-w-xs rounded overflow-hidden shadow-lg">
              <Image unoptimized={true} src={'/static-props.jpeg'} alt={'Next.js static props'} width={2560} height={1340} layout={"responsive"} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Static Props</div>
                <p className="text-gray-700 text-base">
                  This page uses static props to display a background color.
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link className="no-underline text-black visited:text-black" href={`${process.env.PATH_PREFIX}/cars`}>
          <div className="cursor-pointer">
            <div className="m-8 max-w-xs rounded overflow-hidden shadow-lg">
              <Image unoptimized={true} src={'/api-routes.png'} alt={'Next.js api'} width={2560} height={1340} layout={"responsive"} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">API</div>
                <p className="text-gray-700 text-base">
                  This page uses an API to display a list of cars.
                </p>
              </div>
            </div>
          </div>
        </Link>

      </div>
    </main>
  )
}
