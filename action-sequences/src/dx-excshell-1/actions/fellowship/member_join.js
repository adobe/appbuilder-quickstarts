function main(params) {

  console.log('join params is', params)

  var member = {name:"", place:"", region:"", occupation:"", joined:"", organization:"", item:"" };

  // The organization being joined is fixed
  member.organization = "fellowship";

  // Fill in a member record from parameters
  member.name = params.name;
  member.place = params.place;
  member.occupation = params.job;

  // Save the current timestamp when we created the member record
  member.joined = Date.now();

  return { member: member };
}

exports.main = main