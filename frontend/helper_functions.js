  export const padZeroes = (num, size) => {
    let numString = num + "";

    while (numString.length < size) {
      numString = "0" + numString;
    }

    return numString;
  }
