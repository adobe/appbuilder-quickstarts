import colors from 'data/colors'

export default function Index({ color }) {
  const hex = color?.hex
  return (
    <view>
      <h1 className="text-4xl text-center mt-10">Static Props</h1>
      <p className="text-center text-xl mt-5 text-gray-700">This page uses static props to display a color.</p>
      <div className="flex justify-center mt-10">
        <div className="w-64 h-64 rounded-md" style={{ backgroundColor: hex }}></div>
      </div>
      <button 
        className="block w-64 mx-auto mt-5 p-2 rounded-md"
        onClick={() => {
          window.history.back()
        }}
      >Try another color</button>
    </view>
  )
}

export async function getStaticPaths() {
  return {
    paths: colors.map(({ name }) => ({
      params: { color: name }
    })),
    fallback: true // false or 'blocking'
  };
}

export async function getStaticProps({ params, ...context }) {
  let color
  if (context?.preview) {
    color = context.previewData
  }
  else {
    color = colors.find(({ name }) => name === params.color);
  }


  if (color) {
    return {
      props: {
        color
      }
    }
  }
  else {
    return { notFound: true }
  }
}