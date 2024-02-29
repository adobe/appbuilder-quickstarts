// Fake cars data
import cars from 'data/garage'

export default function carHandler(req, res) {
  const {
    query,
    method
  } = req
  
  const foundCar = cars.find((car) => car.id === parseInt(query.id))
  
  if (method === 'GET') {
    if (!foundCar) {
      res.status(404).end(`Car with id ${query.id} not found`)
    }
    else {
      res.status(200).json(foundCar)
    }
  }
  else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}