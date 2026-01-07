import re
import sys

def convert_rem_values(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        def replacer(match):
            old_rem_value = float(match.group(1))
            new_rem_value = old_rem_value * 10 / 16
            # Format to a reasonable number of decimal places
            new_rem_value_str = f'{new_rem_value:.4f}'.rstrip('0').rstrip('.')
            return f'[{new_rem_value_str}rem]'

        # This regex looks for arbitrary values in Tailwind CSS classes like `w-[10rem]`
        # It captures the numeric part of the rem value.
        pattern = re.compile(r'\[(\d*\.?\d+)rem\]')

        if pattern.search(content):
            print(f"Found and converting rem values in {file_path}")
            content = pattern.sub(replacer, content)

            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Successfully updated {file_path}")
        else:
            print(f"No rem values to convert in {file_path}")

    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
    except Exception as e:
        print(f"An error occurred while processing {file_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_rem.py <file_path1> <file_path2> ...")
        sys.exit(1)

    for file_path in sys.argv[1:]:
        convert_rem_values(file_path)
