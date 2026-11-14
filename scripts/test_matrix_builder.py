import sys, os, json, sqlite3

print("Checking test environment...")
conn = sqlite3.connect('/Users/soncris/Ailatrieuphu/Question_sqlite')
c = conn.cursor()
c.execute("SELECT count(*) FROM Question")
print("VTV3 rows:", c.fetchone()[0])
conn.close()

with open('/tmp/translated_trivia.json', 'r', encoding='utf-8') as f:
    tr = json.load(f)
print("Trivia rows:", len(tr))
