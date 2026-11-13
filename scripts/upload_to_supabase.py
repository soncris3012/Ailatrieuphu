# scripts/upload_to_supabase.py
import urllib.request
import json
import time

SUPABASE_URL = "https://bnvnjuqsekqwqmoiqvcl.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJudm5qdXFzZWtxd3Ftb2lxdmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1NzgyNzMsImV4cCI6MjExMDE1NDI3M30.2oPn0x5HMVkj8_5TYpHEDAL11RCBEoCeKth2Z--kJ4s"

with open("/Users/soncris/Ailatrieuphu/data/questions_15k.json") as f:
    questions = json.load(f)

total = len(questions)
batch_size = 500
print(f"Total questions to upload: {total} in batches of {batch_size}")

for i in range(0, total, batch_size):
    batch = questions[i:i+batch_size]
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/questions",
        data=json.dumps(batch).encode("utf-8"),
        headers={
            "apikey": ANON_KEY,
            "Authorization": f"Bearer {ANON_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        },
        method="POST"
    )
    
    success = False
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                if response.status in (200, 201):
                    success = True
                    break
        except Exception as e:
            print(f"Batch {i//batch_size + 1} attempt {attempt+1} failed: {e}")
            time.sleep(2)
            
    if success:
        print(f"Uploaded batch {i//batch_size + 1}/{(total+batch_size-1)//batch_size} ({i+len(batch)}/{total})")
    else:
        print(f"Failed batch {i//batch_size + 1}")

print("Upload complete!")
