const myBooksBtn = document.getElementById("my-books-btn")
const myExchangesBtn = document.getElementById("my-exchanges-btn")
const myLoansBtn = document.getElementById("my-loans-btn")

const myBooksContainer = document.getElementById("my-books-container")
const myExchangesContainer = document.getElementById("my-exchanges-container")
const myLoansContainer = document.getElementById("my-loans-container")

myBooksBtn.addEventListener("click", () => {
  myBooksBtn.classList.remove("btn-not-clicked")
  myBooksBtn.classList.add("btn-clicked")
  myBooksContainer.classList.remove("container-when-not-clicked")
  myBooksContainer.classList.add("container-when-clicked")

  myExchangesBtn.classList.remove("btn-clicked")
  myExchangesBtn.classList.add("btn-not-clicked")
  myExchangesContainer.classList.remove("container-when-clicked")
  myExchangesContainer.classList.add("container-when-not-clicked")

  myLoansBtn.classList.remove("btn-clicked")
  myLoansBtn.classList.add("btn-not-clicked")
  myLoansContainer.classList.remove("container-when-clicked")
  myLoansContainer.classList.add("container-when-not-clicked")
})

myExchangesBtn.addEventListener("click", () => {
  myExchangesBtn.classList.remove("btn-not-clicked")
  myExchangesBtn.classList.add("btn-clicked")
  myExchangesContainer.classList.remove("container-when-not-clicked")
  myExchangesContainer.classList.add("container-when-clicked")

  myBooksBtn.classList.remove("btn-clicked")
  myBooksBtn.classList.add("btn-not-clicked")
  myBooksContainer.classList.remove("container-when-clicked")
  myBooksContainer.classList.add("container-when-not-clicked")

  myLoansBtn.classList.remove("btn-clicked")
  myLoansBtn.classList.add("btn-not-clicked")
  myLoansContainer.classList.remove("container-when-clicked")
  myLoansContainer.classList.add("container-when-not-clicked")
})

myLoansBtn.addEventListener("click", () => {
  myLoansBtn.classList.remove("btn-not-clicked")
  myLoansBtn.classList.add("btn-clicked")
  myLoansContainer.classList.add("container-when-clicked")
  myLoansContainer.classList.remove("container-when-not-clicked")
  // myBooksContainer.classList.add("container-when-clicked")

  myBooksBtn.classList.remove("btn-clicked")
  myBooksBtn.classList.add("btn-not-clicked")
  console.log(myBooksBtn)
  myBooksContainer.classList.remove("container-when-clicked")
  myBooksContainer.classList.add("container-when-not-clicked")

  myExchangesBtn.classList.remove("btn-clicked")
  myExchangesBtn.classList.add("btn-not-clicked")
  myExchangesContainer.classList.remove("container-when-clicked")
  myExchangesContainer.classList.add("container-when-not-clicked")
})


// ADD POP-UPS

const loanBtn = document.querySelectorAll(".loanBtn")
loanBtn.addEventListener("click", () => {
  console.log("slay")
  alert("loan requested!")
})
// loanBtns.forEach(loanBtn => {
//   loanBtn.addEventListener("click", () => {
//     console.log("slay")
//     alert("loan requested!")
//   })
// })