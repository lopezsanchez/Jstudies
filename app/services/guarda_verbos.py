import json
import random
from pathlib import Path

DATA_FILE = Path("data/verbos.json")
CAMPOS = ["infinitivo", "pasado", "participio", "traduccion"]

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

def buscar_por_campo(valor, campo):
    verbos = cargar_verbos()
    valor = valor.lower().strip()

    for v in verbos:
        if v[campo].lower() == valor:
            return v
        
    return None

def contar_verbos():
    return len(cargar_verbos())

def obtener_todos_ordenados():
    verbos = cargar_verbos()
    return sorted(verbos, key=lambda v: v["infinitivo"].lower())

def generar_examen(n):
    verbos = cargar_verbos()
    seleccion = random.sample(verbos, min(n, len(verbos)))

    examen = []
    for v in seleccion:
        campo_vacio = random.choice(CAMPOS)
        examen.append({
            "verbo": v,
            "campo_vacio": campo_vacio
        })

    return examen