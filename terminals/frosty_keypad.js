const sieveEratosthenes = limit => {
    const primes = new Array(limit).fill(1);
    if (limit >= 2) {
        const sqrtlmt = Math.sqrt(limit) - 2;
        for (let i = 2; i <= sqrtlmt; i++) {
          if (primes[i])
            for (let j = i * i; j < primes.length; j += i) primes[j] = 0;
        }
    }
    return primes.map((el, i) => el && i !== 1 ? i : 0).filter(el => el !== 0);
}

const codes = sieveEratosthenes(9999)
              .map(el => el.toString())
              .filter(el => el.length === 4)
              .filter(el => el.split('').every(digit => digit.match(/[137]/g)))
              .filter(el => el.includes('1') && el.includes('3') && el.includes('7'))

console.log(codes);
