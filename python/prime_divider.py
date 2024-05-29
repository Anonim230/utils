import sympy
import pickle
import signal
import sys
import os

CHECKPOINT_FILE = 'factorization_checkpoint.pkl'
PROGRESS_INTERVAL = 100  # Interval for printing progress and saving checkpoints

# Function to save checkpoint
def save_checkpoint(data):
    with open(CHECKPOINT_FILE, 'wb') as f:
        pickle.dump(data, f)
    print("Checkpoint saved.")

# Function to load checkpoint
def load_checkpoint():
    if os.path.exists(CHECKPOINT_FILE):
        with open(CHECKPOINT_FILE, 'rb') as f:
            data = pickle.load(f)
        print("Checkpoint loaded.")
        return data
    return None

# Signal handler for interruption (Ctrl+C)
def signal_handler(signum, frame):
    global checkpoint_data
    save_checkpoint(checkpoint_data)
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

def trial_division(n, limit):
    """Perform trial division up to a specified limit."""
    factors = {}
    for p in sympy.primerange(2, limit):
        while n % p == 0:
            if p in factors:
                factors[p] += 1
            else:
                factors[p] = 1
            n //= p
        if p % PROGRESS_INTERVAL == 0:
            print(f"Progress: checked up to prime {p}")
            checkpoint_data = {'n': n, 'factors': factors}
            save_checkpoint(checkpoint_data)
    return n, factors

# Modified find_prime_divisors function with checkpointing and progress printing
def find_prime_divisors(n):
    global checkpoint_data

    # Convert the number to an integer
    n = int(n)

    # Check if there is a saved checkpoint
    checkpoint_data = load_checkpoint()
    if checkpoint_data:
        n = checkpoint_data['n']
        factors = checkpoint_data['factors']
    else:
        factors = {}

    # Perform trial division up to a reasonable limit
    limit = 10**6
    n, trial_factors = trial_division(n, limit)
    factors.update(trial_factors)

    if n > 1:
        print("Switching to sympy.factorint for remaining factorization...")
        remaining_factors = sympy.factorint(n)
        factors.update(remaining_factors)

    checkpoint_data = {'n': 1, 'factors': factors}
    save_checkpoint(checkpoint_data)

    # Extract prime factors
    prime_divisors = [p for p in factors.keys()]

    return prime_divisors

# Example usage
if __name__ == "__main__":
    number = "138012665252108772712309596282595273270312250006825432236828569075215491018073967909227336636333554976248049970032283459888691234130599669929439461161924845194888640305496686961221835970218256686333659216110790447198302318661681453345987704562856670798791524277293281207779745221729547619008307496271557649219"
    #number = "35"
    prime_divisors = find_prime_divisors(number)
    print("Prime divisors:", prime_divisors)

    # Cleanup checkpoint file after successful factorization
    if os.path.exists(CHECKPOINT_FILE):
        os.remove(CHECKPOINT_FILE)
        print("Checkpoint file removed.")

