
export default function Page() {
    return (
        <>
            <h1 className="text-4xl text-center mt-10">Middleware</h1>
            <p className="text-center text-xl mt-5 text-gray-700">This page is served with a middleware that sets a custom header.</p>
            <p className="text-center text-l mt-5 text-gray-700">Check the headers of the response to see the custom header X-Running-On: Adobe App Builder.</p>
        </>
    )
}
