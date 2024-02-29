import { useRouter } from 'next/router'
import colors from 'data/colors'
import Link from 'next/link'

export default function Page() {
    const router = useRouter()

    return (
        <>
            <h1 className="text-4xl text-center mt-10">Static Props</h1>
            <p className="text-center text-xl mt-5 text-gray-700">This page uses static props to display a background color.</p>
            <p className="text-center text-l mt-5 text-gray-700">Select a color:</p>
            <select
                className="block w-1/2 mx-auto mt-5 p-3 rounded-md"
                value={colors[0].name}
                onChange={(e) => {
                    router.push(`${process.env.PATH_PREFIX}/static-props/${e.target.value}`)
                }}
            >
                {colors.map(({ name }) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </>
    )
}
