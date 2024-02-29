export default function Index({ date }) {
    return (
        <>
            <h1 className="text-4xl text-center mt-10">Server Side Props</h1>
            <p className="text-center text-xl mt-5 text-gray-700">This page uses server-side props to display the current date and time.</p>
            <p className="text-center text-l mt-5 text-gray-700">The current date and time is: {date}</p>
        </>
    )
}

export async function getServerSideProps() {
    const today = new Date();
    return {
        props: {
            date: `${today.toDateString()} ${today.toLocaleTimeString()}`,
        }
    }
}
