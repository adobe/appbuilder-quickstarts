import useSwr from 'swr'
import Image from "next/image"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Car({ id }) {
  const { data, error } = useSwr(
    id ? `${process.env.PATH_PREFIX}/api/cars/${id}` : null,
    fetcher
  )

  if (error) return <div>Failed to load car</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="text-center">
      <h1>{data.name} {data.year}</h1>
      <p>{data.description}</p>
      <p>${data.price}</p>
      <div className="flex justify-center">
        <div className="rounded shadow-lg w-1/3 h-1/3">
          <Image unoptimized={true} src={data.image} alt={'Next.js middleware'} width={1024} height={1024} layout={"responsive"} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id
    }
  }
}