import json
from pathlib import Path

DATA_FILE = Path("data/verbos.json")

def cargar_verbos():
    if not DATA_FILE.exists():
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)
    
def guardar_verbos(verbos):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(verbos, f, ensure_ascii=False, indent=2)

def añadir_verbo(nuevo):
    verbos = cargar_verbos()

    for v in verbos:
        if v["infinitivo"].lower() == nuevo["infinitivo"].lower():
            return False  # El verbo ya existe
        
    verbos.append(nuevo)
    guardar_verbos(verbos)
    return True

def obtener_todos():
    return cargar_verbos()