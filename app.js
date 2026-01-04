const express = require('express');
const app = express();
const path = require('path');
const os = require('os');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

function calculatePrimes(iterations) {
    const primes = [];
    for (let i = 0; i < iterations; i++) {
        let candidate = i;
        let isPrime = true;
        for (let c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(candidate);
    }
    return primes.length;
}

app.get('/heavy', (req, res) => {
    const start = Date.now();
    const count = calculatePrimes(1000000);
    const duration = Date.now() - start;
    res.json({
        message: 'Tugas berat selesai',
        prime_count: count,
        duration_ms: duration,
        handled_by_instance: os.hostname() 
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});