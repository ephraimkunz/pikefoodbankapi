import json
import urllib2

INPUT_CSV = "clientList.csv"

def uploadContacts():
    with open(INPUT_CSV, 'r') as f:
        f.readline()
        for line in f:
            try:
                pieces = line.split(',')
                dataDict = {"FirstName": pieces[3], "LastName": pieces[2], "ZipCode": pieces[4]}

                req = urllib2.Request('http://pikefoodbankbackend.azurewebsites.net/households/')
                req.add_header('Content-Type', 'application/json')
                response = urllib2.urlopen(req, json.dumps(dataDict))
            except Exception as ex:
                print(ex)
uploadContacts()