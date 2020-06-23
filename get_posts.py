import dataclasses
import sys
from typing import List, Any
import json
import requests

USAGE = "Usage: python {sys.argv[0]} [--help] | startIndex endIndex outputFileName]"
responseTotal = {}
@dataclasses.dataclass
class Arguments:
    start: int
    end: int
    out: str

# getApiResponse
def getAPIResponse():
    try:
        response = requests.get("https://jsonplaceholder.typicode.com/posts")
        content = response.json()

        for post in content:
            responseTotal[int(post["id"])] = post
    except:
        print("Unexpected error:", sys.exc_info()[0])
        raise

# Export data
def exportData(args:Arguments):
    filterList =[]
    try:
        for key in responseTotal:
            if(int(key)>=int(args.start) and int(key)<=int(args.end)):
                filterList.append(responseTotal[key])

        with open(args.out, 'w') as f:
            print(filterList, file=f)
    except:
        print("Unexpected error:", sys.exc_info()[0])
        raise

# move args to class object
def validate(args: List[str]):
    if len(args) > 2 and args[2].isdigit():
        args[2] = int(args[2])
    try:
        arguments = Arguments(*args)
    except TypeError:
        raise SystemExit(USAGE)
    
    getAPIResponse()

    exportData(arguments)

def main() -> None:
    args = sys.argv[1:]
    if not args:
        raise SystemExit(USAGE)

    if args[0] == "--help":
        print(USAGE)
    else:
        validate(args)

if __name__ == "__main__":
    main()