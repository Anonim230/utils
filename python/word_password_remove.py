import argparse
import os
import shutil
import zipfile
from docx import Document
from openpyxl import load_workbook
import subprocess

def remove_password_doc(doc_path, output_path):
    # Use antiword to convert .doc file to text (or another format)
    try:
        if not output_path.lower().endswith('.doc'):
            output_path += '.txt'  # Default to .txt if output path doesn't specify .doc extension
        subprocess.run(['antiword', doc_path, '-t', output_path], check=True)
        print(f"Password removed from DOC file: {output_path}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to process DOC file: {e}")

def remove_password_docx(docx_path, output_path):
    temp_dir = 'temp_docx'

    # Ensure the temp directory is clean
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
    os.makedirs(temp_dir)

    # Extract the DOCX file contents to a temporary directory
    with zipfile.ZipFile(docx_path, 'r') as docx:
        docx.extractall(temp_dir)

    # Load the document.xml file
    doc = Document(docx_path)

    # Save the document without password protection
    doc.save(output_path)

    # Clean up the temporary directory
    shutil.rmtree(temp_dir)
    print(f"Password removed from DOCX file: {output_path}")

def remove_password_xlsx(xlsx_path, output_path):
    # Load the workbook
    wb = load_workbook(xlsx_path)

    # Save the workbook without password protection
    wb.save(output_path)
    print(f"Password removed from XLSX file: {output_path}")

def main():
    parser = argparse.ArgumentParser(description="Remove password protection from DOC, DOCX, or XLSX files.")
    parser.add_argument('-i', '--input', type=str, required=True, help='Path to the password-protected DOC, DOCX, or XLSX file')
    parser.add_argument('-o', '--output', type=str, help='Path to save the unprotected file (default: current directory with same name)')

    args = parser.parse_args()

    input_path = args.input
    if args.output:
        output_path = args.output
    else:
        output_path = os.path.join(os.getcwd(), os.path.basename(input_path))

    if input_path.lower().endswith('.doc'):
        remove_password_doc(input_path, output_path)
    elif input_path.lower().endswith('.docx'):
        remove_password_docx(input_path, output_path)
    elif input_path.lower().endswith('.xlsx'):
        remove_password_xlsx(input_path, output_path)
    else:
        print("Unsupported file type. Please provide a DOC, DOCX, or XLSX file.")

if __name__ == "__main__":
    main()

