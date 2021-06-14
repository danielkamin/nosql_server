export function calcNewAvgRating(oldAvg: number, numOfVotes: number, rating: number, addOrDelete: boolean) {
  let newAvg = 0;
  if (addOrDelete === true) {
    newAvg = (oldAvg * numOfVotes + rating) / (numOfVotes + 1);
  } else {
    newAvg = (oldAvg * numOfVotes - rating) / (numOfVotes - 1);
  }
  return newAvg;
}
