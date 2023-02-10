// function logger(req, res, next) {
//   console.log("logging middleware.....");
//   next();
// }

// module.exports = logger;

// module.exports.secretkey = "vasanthisagoodboy";

function addToken() {
  let token = "dasdasdsdasa";
  return function (req) {
    console.log({ token, ...req });
  };
}

let fetchAPI = addToken();

fetchAPI({
  header: "dasdasda",
  body: {
    username: "dasdasda",
    password: "1234",
  },
});

fetchAPI({
  header: "drerrereasdasda",
  body: {
    username: "dasdrewqrqwrwq3asda",
    password: "12rqewrqwer34",
  },
});
