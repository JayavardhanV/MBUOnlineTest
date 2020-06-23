import dataclasses
import sys
from typing import List, Any
import json
import requests

USAGE = "Usage: Please pass valid arguements in the format --start [start_post] --end[ end_post ] --out [output_file]"
responseTotal = {}
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
def exportData(start,end,out):
    # if no endindex
    if(end==0):
        end = len(responseTotal)

    # if Start index is greaterthan endindex
    if(start>end):
        temp = end
        end=start
        start =temp
    
    filterList =[]
    try:        
        for key in responseTotal:
            if(int(key)>=int(start) and int(key)<=int(end)):
                filterList.append(responseTotal[key])
        
        #no input file passed, then display response in terminal     
        if(out == ''):
            for key in filterList:
                print(key)
        else:
            with open(out, 'w') as f:
                print(filterList, file=f)
    except:
        print("Unexpected error:", sys.exc_info()[0])
        raise

# move args to class object
def validate(args: List[str]):
    start = 0
    end = 0
    out =''
    position =1

    while(len(args)-1>=position):
        if(position == 1):
            start = args[1]
        elif( position == 3):
            end = args[3]
        elif(position == 5):
            out = args[5]
        position = position + 1

    #fetch api response
    getAPIResponse()

    #show data into terminal or dump data into file
    exportData(start,end,out)

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