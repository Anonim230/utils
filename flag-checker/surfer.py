import requests
from bs4 import BeautifulSoup
import re

def search_word_with_regex(url, pattern):
    try:
        # Fetch the page content
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Search for the pattern in the page content using regular expressions
        if re.search(pattern, soup.get_text(), re.IGNORECASE):
            print(f"Found a match for '{pattern}' on page: {url}")
        else:
            print(f"No match found for '{pattern}' on page: {url}")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL '{url}': {e}")

# Example usage:
url = 'http://213.230.66.164:31337/'
pattern_to_search = r'flag\{.*\}'
search_word_with_regex(url, pattern_to_search)

