// import { Exercise } from "../myworkouts/types";
// import { ApiBaseUrl } from "./api-base";

// //https://assignment2.swafe.dk/api/Exercises
// const ApiExerciseUrl = ApiBaseUrl + "Exercises";

// // exercise object:
// /*
// {
//   "name": "string",
//   "description": "string",
//   "sets": 0,
//   "repetitions": 0,
//   "time": "string"
// }
// */
// export async function PostExercise(exercise: Exercise) {
//   const response = await fetch(ApiExerciseUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(exercise),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to post exercise");
//   }

//   return response.json();
// }
