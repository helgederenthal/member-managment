import csv
import json
import os
import requests
from datetime import datetime

"""
Reads data from csv files and writes it to a running rest api.
"""

API_URL = "http://localhost:5015"

MEMBERS_FILE = "%USERPROFILE%/Members.csv"

PROPERTIES_MAPPING = {
            "lastname"    : "NACHNAME",
            "firstname"   : "VORNAME",
            "street"      : "STRASSE",
            "housenumber" : "NR",
            "postcode"    : "POSTL",
            "city"        : "ORT",
            "bornon"      : "GEB.",
            "joinedon"    : "EINTRITT",
            # "exitedon"    : "exitedon",
            # "deceasedon"    : "deceasedon"
        }
DATE_FORMAT = '%d.%m.%Y'

def main():
    membersFile = os.path.expandvars(MEMBERS_FILE)

    deleteExistingPersons()

    with open(membersFile, newline="", encoding="utf-8") as csvfile:
        spamreader = csv.reader(csvfile, delimiter=",", quotechar='"')

        firstrow = True
        columnIndices = {}

        url = API_URL + "/api/Person"

        for row in spamreader:
            if firstrow:
                # Calculate column indices
                for prop in PROPERTIES_MAPPING.keys():
                    columnIndices[prop.lower()] = getIndex(row, PROPERTIES_MAPPING[prop])
                print(columnIndices)
                firstrow = False
            else:
                data = {}
                for prop in PROPERTIES_MAPPING.keys():
                    if prop in ["bornon", "joinedon", "exitedon", "deceasedon"]:
                        if len(row[columnIndices[prop]]) > 0:
                            data[prop.lower()] = datetime.strptime(row[columnIndices[prop]], DATE_FORMAT).strftime('%Y-%m-%d')
                    else:
                        data[prop.lower()] = row[columnIndices[prop.lower()]]

                if len(data["lastname"]) > 0 and len(data["firstname"]) > 0:
                    r = requests.post(url, json=data)
                    print(r.text)

def deleteExistingPersons():
    url = API_URL + "/api/Person"
    persons = requests.get(url).content

    for person in json.loads(persons):
        requests.delete(url + "/" + str(person["personId"]))

# Get index of string in array (case-insensitive)
def getIndex(stringArray, searchString):
    i = 0
    for value in stringArray:
        if value.lower() == searchString.lower():
            return i
        i = i + 1


if __name__ == "__main__":
    main()
