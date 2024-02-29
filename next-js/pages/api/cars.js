import cars from 'data/garage'

export default function handler(req, res) {
  res.status(200).json(cars)
}
