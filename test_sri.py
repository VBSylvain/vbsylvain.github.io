import urllib.request
import hashlib
import base64

def get_sri(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        content = response.read()
        sha384_hash = hashlib.sha384(content).digest()
        sri = base64.b64encode(sha384_hash).decode('utf-8')
        print(f"sha384-{sri}")

get_sri("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css")
get_sri("https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js")
get_sri("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js")
