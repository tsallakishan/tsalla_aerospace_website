import re
import sys

def convert_px_to_rem(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        def replacer(match):
            px_value_str = match.group(1)
            try:
                px_value = float(px_value_str)
                if px_value == 0:
                    return '[0]'
                rem_value = px_value / 16
                # Format to a reasonable number of decimal places
                rem_value_str = f'{rem_value:.4f}'.rstrip('0').rstrip('.')
                return f'[{rem_value_str}rem]'
            except ValueError:
                # Handle cases where the captured value is not a valid number
                return match.group(0)

        # This regex looks for arbitrary values in Tailwind CSS classes like `w-[10px]`
        # It captures the numeric part of the px value.
        pattern = re.compile(r'\[(\d*\.?\d+)px\]')

        if pattern.search(content):
            print(f"Found and converting px values in {file_path}")
            content = pattern.sub(replacer, content)

            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Successfully updated {file_path}")
        else:
            print(f"No px values to convert in {file_path}")

    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
    except Exception as e:
        print(f"An error occurred while processing {file_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_px_to_rem.py <file_path1> <file_path2> ...")
        sys.exit(1)

    for file_path in sys.argv[1:]:
        convert_px_to_rem(file_path)
