# -*- coding: utf8 -*-
from googleplaces import GooglePlaces, types, lang
import pandas as pd
import simplejson as json
import os.path

API_KEY = 'AIzaSyBZ6dHIrv_aep5hXWLOnrNvdanTWEHy1EI'

google_places = GooglePlaces(API_KEY)
df = pd.read_csv("list_places_update.csv")

def get_full_information(row):
    print (row)
    return

    print ('Request for address:', address)
    if os.path.isfile("text_search_cache/" + address):
        with open("text_search_cache/" + address, "rb") as f:
            print ("Done (from cached)!")
            print (f.read().decode("utf-8"))
            return f.read().decode("utf-8")
    else:
        try:
            query_result = google_places.text_search(query=address)
            with open("text_search_cache/" + address, "w") as f:
                json.dump(query_result.raw_response, f)
            print ('Done!')
            return query_result.raw_response
        except:
            print ("Error, skip!")
            return None

df.head(1).apply(get_full_information)
