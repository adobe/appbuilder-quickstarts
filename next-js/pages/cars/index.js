import useSwr from 'swr'
import Link from 'next/link'
import Image from "next/legacy/image"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
    const { data: cars, error } = useSwr(`${process.env.PATH_PREFIX}/api/cars`, fetcher)

    if (error) return <div>Failed to load cars</div>
    if (!cars) return <div>Loading...</div>

    return (
        <div className="text-center">
            <h1 className="text-4xl mt-10">API</h1>
            <p className="text-xl mt-5 text-gray-700">This page uses SWR to fetch data from an API.</p>
            <ul className="flex justify-center mt-5">
                {cars.map((car) => (
                    <Link key={car.id} className="no-underline text-black visited:text-black" href={`/cars/${car.id}`}>
                        <div className="cursor-pointer">
                            <div className="m-8 max-w-xs rounded overflow-hidden shadow-lg">
                                <Image src={car.image} alt={'Next.js middleware'} width={2048} height={2048} layout={"responsive"} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{car.name} {car.year}</div>
                                    <p className="text-gray-700 text-base">
                                        {car.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    )
}