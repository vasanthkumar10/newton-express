// function test() {
//   console.log(1);

//   setTimeout(() => {
//     console.log(2);
//   });

//   setTimeout(() => {
//     console.log(3);
//   }, 0);

//   console.log(4);
// }

// test();

// async function test1() {
//   console.log(1);
//   await new Promise((res, rej) =>
//     setTimeout(() => {
//       console.log(2);
//       res(1);
//     })
//   );
//   await new Promise((res, rej) =>
//     setTimeout(() => {
//       console.log(3);
//       res(1);
//     })
//   );
//   console.log(4);
// }

// test1();

// console.log("start");
// const p1 = new Promise((res, rej) => {
//   console.log(1);
// });

// console.log("end");

// // Q2.

// console.log("start");
// const p1 = new Promise((res, rej) => {
//   console.log(1);
//   res(2);
// });

// p1.then((res) => console.log(res));

// console.log("end");

// // Q3.

// console.log("start");
// const p1 = new Promise((res, rej) => {
//   console.log(1);
//   res(2);
//   console.log(3);
// });

// p1.then((res) => console.log(res));

// console.log("end");

// // Q4.

// console.log("start");
// const p1 = new Promise((res, rej) => {
//   console.log(1);
// });

// p1.then((res) => console.log(res));

// console.log("end");

// // Q5.

// console.log("start");

// const fn = () =>
//   new Promise((res, rej) => {
//     console.log(1);
//     res("success");
//   });

// console.log("middle");

// fn().then((res) => console.log(res));

// console.log("end");

// // Q6.

// console.log("start");

// const fn = () =>
//   new Promise((res, rej) => {
//     console.log(1);
//     res("success");
//   });

// fn().then((res) => console.log(res));
// console.log("middle");

// console.log("end");

// // Q7.

// console.log("start");

// Promise.resolve(1).then((res) => console.log(res));
// Promise.resolve(2).then((res) => console.log(res));

// console.log("end");

// // Q8.

// console.log("start");

// setTimeout(() => {
//   console.log(1);
// });

// Promise.resolve().then(() => console.log(2));

// console.log("end");

// // Q9.

// console.log("start");
// const p1 = new Promise((res, rej) => {
//   console.log(1);
//   setTimeout(() => {
//     console.log(2);
//     res(3);
//     console.log(4);
//   }, 0);
//   console.log(5);
// });

// p1.then((res) => console.log(res));

// console.log("end");

// // Q10.

// console.log("start");

// setTimeout(() => {
//   console.log(1);
//   Promise.resolve().then(() => console.log(2));
// }, 0);

// setTimeout(() => {
//   console.log(3);
// });

// console.log("end");

// Q11.

console.log("start");
Promise.resolve().then(() => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 2000);
});

setTimeout(() => {
  console.log(3);
  Promise.resolve().then(() => console.log(4));
}, 2000);

console.log("end");
