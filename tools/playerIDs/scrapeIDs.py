from bs4 import BeautifulSoup
from pprint import pprint
import json

with open('statsNBA.html', 'r') as data:
    nbaSoup = BeautifulSoup(data, 'html.parser')

allPlayerData = []

for a in nbaSoup.find_all("a"):
    link = a['href'].split('/')
    text = a.get_text().split('\n')
    abbr = a.find('abbr')
    spans = a.find('p').find_all('span')

    name = a['title']
    place = abbr['title']
    abbreviation = abbr.get_text()
    playerID = link[4] if len(link) == 5 else link[3]
    number = spans[0].get_text()
    team = spans[2].get_text().replace('_', ' ').title()
    position = spans[1].get_text()

    playerData = {
        'name': name,
        'id': playerID,
        'place': place,
        'team': team,
        'teamAbbreviation': abbreviation,
        'number': number,
        'position': position
    }

    allPlayerData += [playerData]

    # if team not in allPlayerData:
    #     allPlayerData[team] = [playerData]
    # else:
    #     allPlayerData[team] += [playerData]

pprint(allPlayerData)

with open('player-data.json', 'w') as outs:
    json.dump(allPlayerData, outs)
