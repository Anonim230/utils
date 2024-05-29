import pickle
import sys
import os

def read_pickle_file(file_path):
    if not os.path.exists(file_path):
        print(f"Error: The file '{file_path}' does not exist.")
        return

    with open(file_path, 'rb') as f:
        data = pickle.load(f)
    
    print("Contents of the pickle file:")
    print(data)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python read_pickle.py <path_to_pickle_file>")
    else:
        pickle_file_path = sys.argv[1]
        read_pickle_file(pickle_file_path)

