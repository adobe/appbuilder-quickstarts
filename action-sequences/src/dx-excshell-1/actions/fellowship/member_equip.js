
const equipmentMap = new Map([
  ['gentleman', 'ring'],
  ['wizard', 'staff'],
  ['archer', 'bow'],
  ['knight', 'sword'],
]);

function main(params) {
  console.log('equip params is', params)

  // Equip the member based upon their occupation
  member = params.member;
  member.item = equipmentMap.get(member.occupation) || "None";

  console.log('returning member : ', member )
  return { statusCode: 200, body: { member } };
}

exports.main = main