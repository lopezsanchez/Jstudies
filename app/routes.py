from flask import Blueprint, render_template, request
from .services.scraper import buscar_verbo
from .services.guarda_verbos import añadir_verbo, obtener_todos

main = Blueprint("main", __name__)

@main.route("/", methods =["GET", "POST"])
def index():
    mensaje = None

    if request.method == "POST" and request.form:
        verbo = {
            "infinitivo": request.form.get("infinitivo","").strip(),
            "pasado": request.form.get("pasado", "").strip(),
            "participio": request.form.get("participio", "").strip(),
            "traduccion": request.form.get("traduccion", "").strip()
        }

        if añadir_verbo(verbo):
            mensaje = "Verbo añadido correctamente ✅"
        else:
            mensaje = "El verbo ya existe ❌"
    
    return render_template("index.html", mensaje=mensaje, pestaña_activa="añadir")

@main.route("/todos")
def todos():
    verbos = obtener_todos()
    return render_template("index.html", verbos=verbos, pestaña_activa="todos")


""" def index():
    resultado = None

    if request.method == "POST":
        verbo = request.form["infinitivo"]
        resultado = buscar_verbo(verbo)

    return render_template("index.html", resultado=resultado) """

