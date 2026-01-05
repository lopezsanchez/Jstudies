import requests
from bs4 import BeautifulSoup

URL = "https://blog.cambridge.es/listado-de-verbos-irregulares-en-ingles/"

def buscar_verbo(infinitivo):
    res = requests.get(URL, timeout=18)
    res.raise_for_status()

    soup = BeautifulSoup(res.text, "html.parser")

    for fila in soup.select("table tr"):
        cols = [td.get_text(strip=True) for td in fila.find_all("td")]
        if len(cols) == 4:
            inf, pasado, participio, traduccion = cols
            if inf.lower() == infinitivo.lower():
                return {
                    "infinitivo" : inf,
                    "pasado" : pasado,
                    "participio" : participio,
                    "traduccion" : traduccion
                }
            
    return None