export default () => {
  const numbers = Array(10000)
    .fill(null)
    .map((_n, i) => i + 1);

  const run = document.getElementById("run");
  const stop = document.getElementById("stop");
  const result = document.getElementById("result");
  const loading = document.querySelector(".loading");
  let isRun = false;

  const averageAsync = (numbers, callback) => {
    isRun = true;
    run.setAttribute("disabled", isRun);
    const len = numbers.length;
    let sum = 0;

    if (len === 0) {
      return 0;
    }
    loading.classList.add("show");
    const calculateSumAsync = (i) => {
      if (i === len || !isRun) {
        callback(sum / len);
        loading.classList.remove("show");
        run.removeAttribute("disabled");
        return;
      }
      setTimeout(() => {
        sum += numbers[i];
        calculateSumAsync(i + 1);
      }, 0);
    };

    calculateSumAsync(0);
  };

  run.addEventListener("click", () => {
    result.value = "";
    averageAsync(numbers, (res) => {
      result.value = res;
    });
  });

  stop.addEventListener("click", () => {
    isRun = false;
  });
};
